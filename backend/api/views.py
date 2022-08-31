from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.settings import api_settings
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from stackapi import StackAPI
from django.core.cache import cache
from django.core.paginator import Paginator
import json
from django.utils.decorators import method_decorator

from ratelimit.decorators import ratelimit
# Create your views here.

class StackOverflowSearch(APIView):


    @method_decorator(ratelimit(key='ip', rate='5/m', method='GET'))
    @method_decorator(ratelimit(key='ip', rate='100/d', method='GET'))
    def get(self,request,*args,**kwargs):
        getData=dict(request.GET)
        sentinel = object()
        filteredData={}
        pagination_page=int(getData['pagination_page'][0])
        was_limited = getattr(request, 'limited', False)

        if was_limited:
            return Response({"questions":[],"limit_reached":True})


        for key in getData:
            if getData[key][0] and getData[key][0] != "please-select" and key !='pagination_page':
                if getData[key][0]=='true':
                    filteredData[key]=True
                
                elif getData[key][0]=='false':
                    filteredData[key]=False
                
                else:
                    try:
                        filteredData[key]=int(getData[key][0])
                    except:
                        filteredData[key]=getData[key][0]


        json_filtered_data=json.dumps(filteredData)
        if cache.get(json_filtered_data, sentinel) is sentinel:
            print("not in cache")
            SITE = StackAPI('stackoverflow')
            questions = SITE.fetch('questions', **filteredData)
            json_questions=json.dumps(questions)   
            cache.set(json_filtered_data, json_questions, 300)
            items=questions['items']
            p = Paginator(items, 10)
            total_pages=p.num_pages
            current_page=p.page(pagination_page)
            return Response({"questions":current_page.object_list,"total_pages":total_pages})
        else:
            cached_questions=cache.get(json_filtered_data)
            questions=json.loads(cached_questions)
            items=questions['items']
            p = Paginator(items, 10)
            total_pages=p.num_pages
            current_page=p.page(pagination_page)
            return Response({"questions":current_page.object_list,"total_pages":total_pages})

        
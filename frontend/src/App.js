
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment } from 'react';
import DateInput from './Components/dateInput/date-input.component';
import DropDown from './Components/dropDown/drop-down.component';
import NumberInput from './Components/numberInput/number-input.component';
import TextInput from './Components/textInput/text-input.component';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';




let paramsData={}

function App() {
  
  const axios = require('axios');
  const [searchResult, setSearchResult] = useState(["Please Search!"])
  const [paginationNumber, setPaginationNumber] = useState(-1)
  const [activePage, setActivePage] = useState(1)

  let items = [];
  if(paginationNumber!=-1){

    items.push(
      <Pagination.Item onClick={e=>{
        changePage(1)
      }} key={paginationNumber} active={1 === activePage}>
        1
      </Pagination.Item>,
    );
    for (let number = activePage-5; number < activePage+10; number++) {
      if(number>paginationNumber-1){
        continue
      }
      if(number<=1){
        continue
      }

      items.push(
        <Pagination.Item key={number} onClick={e=>{changePage(number)}} active={number === activePage}>
          {number}
        </Pagination.Item>,
      );
    }
    items.push(
      <Pagination.Item key={paginationNumber} onClick={e=>{changePage(50)}} active={50 === activePage}>
        {paginationNumber}
      </Pagination.Item>,
    );
  }

  function changeToUnixDate(dateStr){
    if(dateStr){

      const date = new Date(dateStr);
      return Math.floor(date.getTime() / 1000);
    }
    return " "
  }

  function searchStackOverflow(e){
        e.e.target.innerText="Please Wait......"
        paramsData={
          pagination_page:1,
          page:document.getElementById('page').value,
          pagesize:document.getElementById('pagesize').value,
          fromdate:changeToUnixDate(document.getElementById('fromdate').value),
          todate:changeToUnixDate(document.getElementById('todate').value),
          order:document.getElementById('order').value,
          min:changeToUnixDate(document.getElementById('min').value),
          max:changeToUnixDate(document.getElementById('max').value),
          sort:document.getElementById('sort').value,
          q:document.getElementById('q').value,
          accepted:document.getElementById('accepted').value,
          answers:document.getElementById('answers').value,
          body:document.getElementById('body').value,
          closed:document.getElementById('closed').value,
          migrated:document.getElementById('migrated').value,
          notice:document.getElementById('notice').value,
          notagged:document.getElementById('notagged').value,
          tagged:document.getElementById('tagged').value,
          title:document.getElementById('title').value,
          user:document.getElementById('user').value,
          url:document.getElementById('url').value,
          views:document.getElementById('views').value,
          wiki:document.getElementById('wiki').value,
        }
        // fetch(url,{method:"get"}).then(res=>res.json()).then(json_res=>{console.log(json_res)})
        axios.get('http://localhost:8000/api/get-data/',{params:paramsData})
        .then(response => {
          // setSearchResult([response])
          console.log(response)
          if (response.data.limit_reached){
            alert("Limit Reached Please Try After 5 mins")
            return 
          }
          setPaginationNumber(response.data.total_pages)
          setSearchResult(response.data.questions)
          e.e.target.innerText="Search"

        })
        .catch(error => {
          console.log(error)
          e.e.target.innerText="Search"

        });
  }

  function changePage(number){
    paramsData={
      pagination_page:number,
      page:document.getElementById('page').value,
      pagesize:document.getElementById('pagesize').value,
      fromdate:changeToUnixDate(document.getElementById('fromdate').value),
      todate:changeToUnixDate(document.getElementById('todate').value),
      order:document.getElementById('order').value,
      min:changeToUnixDate(document.getElementById('min').value),
      max:changeToUnixDate(document.getElementById('max').value),
      sort:document.getElementById('sort').value,
      q:document.getElementById('q').value,
      accepted:document.getElementById('accepted').value,
      answers:document.getElementById('answers').value,
      body:document.getElementById('body').value,
      closed:document.getElementById('closed').value,
      migrated:document.getElementById('migrated').value,
      notice:document.getElementById('notice').value,
      notagged:document.getElementById('notagged').value,
      tagged:document.getElementById('tagged').value,
      title:document.getElementById('title').value,
      user:document.getElementById('user').value,
      url:document.getElementById('url').value,
      views:document.getElementById('views').value,
      wiki:document.getElementById('wiki').value,
    }
    // fetch(url,{method:"get"}).then(res=>res.json()).then(json_res=>{console.log(json_res)})
    axios.get('http://localhost:8000/api/get-data/',{params:paramsData})
    .then(response => {
      // setSearchResult([response])
      console.log(response)
      if (response.data.limit_reached){
        alert("Limit Reached Please Try After 5 mins")
        return 
      }
      setActivePage(number)
      setSearchResult(response.data.questions)



    })
    .catch(error => {
      console.log(error)
      alert("Some error occurs! Please Use Correct Types in Input")

    });
}

    return ( 
            <Container>
              <Fragment >
                    <Row className='mt-5'>
                          <Col>
                          <NumberInput id="page" label="page"/>
                          </Col>
                          <Col>
                          <NumberInput id="pagesize" label="pagesize"/>
                          </Col>
                          <Col>
                          <DateInput id="fromdate" label="fromdate"/>
                          </Col>
                    </Row>

                    <Row className='mt-3'>
                          <Col>
                          <DateInput id="todate" label="todate"/>
                          
                          </Col>
                          <Col>
                          <DropDown label="order" id="order" options={["desc","asc"]} />
                          </Col>
                          <Col>
                          <DateInput id="min" label="min"/>

                          </Col>
                    </Row>

                    <Row className='mt-3'>
                          <Col>
                          <DateInput id="max" label="max"/>
                          
                          </Col>
                          <Col>
                          <DropDown label="sort" id="sort" options={["activity","votes","creation"]} />
                          
                          </Col>
                          <Col>
                          <TextInput label="q" id="q" />
                          </Col>
                    </Row>

                    <Row className='mt-3'> 
                          <Col>
                          <DropDown label="accepted" id="accepted" options={[true,false]} />
                          
                          </Col>
                          <Col>
                          <NumberInput label="answers" id="answers"/>
                          </Col>
                          <Col>
                          <TextInput label="body" id="body"/ >
                          </Col>
                    </Row>

                    <Row className='mt-3'>
                          <Col>
                            <DropDown label="closed" id="closed" options={[true,false]} />
                          
                          </Col>
                          <Col>
                            <DropDown label="migrated" id="migrated" options={[true,false]} />
                          </Col>
                          <Col>
                            <DropDown label="notice" id="notice" options={[true,false]} />
                          </Col>
                    </Row>

                    <Row className='mt-3'>
                          <Col>
                            <TextInput label="notagged" id="notagged"/>
                          </Col>
                          <Col>
                            <TextInput label="tagged" id="tagged"/>
                          </Col>
                          <Col>
                            <TextInput label="title" id="title"/>
                          </Col>
                    </Row>

                    <Row className='mt-3'>
                          <Col>
                             <NumberInput label="user" id="user" />
                          </Col>
                          <Col>
                            <TextInput label="url" id="url"/>
                          </Col>
                          <Col>
                            <NumberInput label="views" id="views" />
                          </Col>
                    </Row>

                    <Row className='mt-3'> 
                          <Col>
                          <DropDown label="wiki" id="wiki" options={[true,false]} />                      
                          </Col>
                    </Row>

                    <Button id="searchBtn" variant="primary" onClick={e=>{
                        searchStackOverflow({e})
                    }} className="mt-3">Search</Button>

                    <div className="resulContainer mt-5">
                      <h3>Result:</h3>
                      <ListGroup>
                        {searchResult.map(e=>{
                          return (
                            <ListGroup.Item>{e.title} <br/> <a target="blank" href={e["link"]}>Go TO StackOverflow</a></ListGroup.Item>
                          )
                        })}
                      </ListGroup>

                    </div>
             
                       <Pagination className=" mt-3" size="sm">
   
                            {items}

                       </Pagination>
              </Fragment>
            </Container>
    );
}

export default App;
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Fragment } from 'react';

function DropDown(props) {
    const [dropDownValue, setdropDownValue] = useState(" ")
    return ( <Fragment >
        <Form.Group >
        <Form.Label > { props.label } </Form.Label> 
        <Form.Select value = { dropDownValue }
        onChange = { e => { setdropDownValue(e.target.value) } }
        id = { props.id } >
        <option value = "please-select" > Please Select </option> {
            props.options.map((value, index, array) => {
                return <option value = { value } > { value.toString() } </option>

            })
        } 
        </Form.Select> 
        
        </Form.Group> 
        
        </Fragment>
    )
}

export default DropDown
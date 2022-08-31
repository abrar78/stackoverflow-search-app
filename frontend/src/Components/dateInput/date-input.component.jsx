import React, { Fragment } from 'react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';



function DateInput(props) {
    const [date, setDate] = useState("")
    return ( 
           <Fragment>
                  <Form.Label htmlFor="inputPassword5">{props.label}</Form.Label>
                    <Form.Control
                        type="date"
                        id={props.id}
                        value={date}
                        onChange={e=>{
                            setDate(e.target.value)
                            // requestData[props.label]=e.target.value
 
                        }}

                    />
           </Fragment>
    )
}

export default DateInput
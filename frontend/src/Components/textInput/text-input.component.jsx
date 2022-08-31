import React, { Fragment } from 'react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';



function TextInput(props) {
    const [textInput, setTextInput] = useState("")
    return ( 
           <Fragment>
                  <Form.Label>{props.label}</Form.Label>
                    <Form.Control
                        type="text"
                        id={props.id}
                        value={textInput}
                        onChange={e=>{
                            setTextInput(e.target.value)
                        }}

                    />
           </Fragment>
    )
}

export default TextInput
import React, { Fragment } from 'react'
import { useState } from 'react'
import Form from 'react-bootstrap/Form';



function NumberInput(props) {
    const [numberInput, setNumberInput] = useState("")
    return ( 
           <Fragment>
                  <Form.Label htmlFor="inputPassword5">{props.label}</Form.Label>
                    <Form.Control
                        type="number"
                        id={props.id}
                        value={numberInput}
                        onChange={e=>{
                            setNumberInput(e.target.value)
                        }}

                    />
           </Fragment>
    )
}

export default NumberInput
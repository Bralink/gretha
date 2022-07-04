import { setRevalidateHeaders } from "next/dist/server/send-payload";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import {ContactModel} from "../models/Contact";


export const Contact = () => { 

    const [formValidatedContact, setFormValidateContact] = React.useState(false);
    const [dataContact, setDataContact] = React.useState<ContactModel>(new ContactModel());

    const validateFormContact = (event: any) => {
        console.log(event);
        event.preventDefault();
        event.stopPropagation()

        setFormValidateContact(true);
    }
    return(                                                                  
        <><Container style={{paddingBottom: '0px'}}>
            <Row>
                <Col md={2} >  
                </Col>
                <Col md={8}>
                    <div className="formContact">
                        <Form noValidate validated={formValidatedContact} onSubmit={validateFormContact}>
                            <Row>
                                <Col md={12}>
                                    <p style={{textAlign: 'center', paddingTop: '20px',paddingBottom: '15px',color:'#383086', fontSize: '17px'}}> <b>Contacto:</b></p>
                                </Col>      
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Form.Group className="mb-3" >
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label>Correo electrónico*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    className="shadowInput" 
                                                    type="email"
                                                    value={dataContact.email} 
                                                    onChange={ (event: any) => {
                                                        setDataContact({
                                                            ...dataContact,
                                                            email: event.target.value
                                                        });
                                                        setFormValidateContact(false);
                                                    }} 
                                                    placeholder="email@dominio.com" required/>
                                                <Form.Control.Feedback type="invalid">
                                                Por favor, ingresa un correo válido.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3" >
                                        <Row>
                                            <Col md={3}  style={{textAlign: 'center'}}>
                                                <Form.Label>Nombre completo*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    className="shadowInput"
                                                    value={dataContact.name} 
                                                    onChange={ (event: any) => {
                                                        setDataContact({
                                                            ...dataContact,
                                                            name: event.target.value
                                                        });
                                                        setFormValidateContact(false);
                                                    }} 
                                                    type="text" placeholder="Nombre" required />
                                                <Form.Control.Feedback type="invalid">
                                                Por favor, indica tu nombre.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>    
                                <Col md={12}>
                                    <Form.Group className="mb-3" >
                                        <Row>
                                            <Col md={3}  style={{textAlign: 'center'}}>
                                                <Form.Label >Asunto*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control
                                                    className="shadowInput"
                                                    type="text" 
                                                    value={dataContact.subject} 
                                                    onChange={ (event: any) => {
                                                        setDataContact({
                                                            ...dataContact,
                                                            subject: event.target.value
                                                        });
                                                        setFormValidateContact(false);
                                                    }} placeholder="Asunto" required />
                                                <Form.Control.Feedback type="invalid">
                                                Por favor, indica el asunto.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                
                                <Col md={12}>
                                    <Form.Group className="mb-3" >
                                        <Row>
                                            <Col md={3}  style={{textAlign: 'center'}}>
                                                <Form.Label >Mensaje*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    className="shadowInput" 
                                                    as={"textarea"} 
                                                    rows={4} 
                                                    value={dataContact.message} 
                                                    onChange={ (event: any) => {
                                                        setDataContact({
                                                            ...dataContact,
                                                            message: event.target.value
                                                        });
                                                        setFormValidateContact(false);
                                                    }} required/>
                                                <Form.Control.Feedback type="invalid">
                                                Indica el texto a enviar.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <span>
                                    <p style={{textAlign: 'right',color:'#7B68EE'}}> *Datos obligatorios </p>
                                    </span>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={3}></Col>
                                <Col md={6} style={{textAlign: 'center'}}>
                                    <Button type="submit">Enviar Mensaje</Button>
                                </Col>
                                <Col md={3}></Col>
                            </Row>   
                        </Form>
                    </div>
                </Col>
                <Col md={2}>
                </Col>
            </Row>
        </Container></>
    );
}


export default Contact;
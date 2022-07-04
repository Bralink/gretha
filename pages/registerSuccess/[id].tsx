import { NextPage } from "next";
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import React from "react";
import ApiTorak from "../../helpers/ApiTorak/ApiTorak";

export const SuccessPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    let idEstudent = parseInt(id!!.toString());
    let apiTorak = new ApiTorak();
    let bandera = false;
    const [code, setCode] = React.useState(undefined);
    const [formValidatedCode, setFormValidateCode] = React.useState(false);
    const [error, setError] = React.useState("");
    
    
    const validateCode = async() =>{
        await apiTorak.sendData("register", "validateCode",{code: code}).then((response : any) => {
            if(response.status){
            
            }
            else{
                
            }
        });    
    }

    const validateForm = (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
    
        if(form.checkValidity()) {
            validateCode();
        }

        setFormValidateCode(true);
    }

   
    useEffect(() => {
        if(id === undefined || idEstudent === null){
            let {id} = router.query;
            idEstudent = parseInt(id!!.toString()); 
        }
    });


    return(
        <Container>
            <Row>
                <Col md={4}>
                </Col>
                <Col md={4} style={{backgroundColor: '#EBE8EC', borderRadius: '1em', padding: '20px'}}>
                    <Row md={1} xs={1}>
                        <Col>
                            <p style={{color: '#e63a52', textAlign: 'center', fontWeight: '600'}}>Tu registro se ha completado, y hemos enviado un codigo de verificación al correo proporcionado, por favor ingresalo a continuacion para que puedas iniciar sesión</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form noValidate validated={formValidatedCode} onSubmit={validateForm}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Row>
                                        <Col md={2}></Col>
                                        <Col md={8}>
                                            <Form.Label style={{color: '#ef7953'}}>Ingresa tu Código</Form.Label>
                                            <Form.Control 
                                                type="number"
                                                placeholder="0000"
                                                onChange={(event:any) => {
                                                    if(event.target.value <= 9999){
                                                        setCode(event.target.value);
                                                    }
                                                }}
                                                value={code}
                                                required/>
                                        </Col>
                                        <Col md={2}></Col>
                                    </Row>
                                    <Row>
                                        <Col md={3}></Col>
                                        <Col md={6} style={{textAlign: 'center'}}>
                                            <Button type="submit">Registro</Button>
                                        </Col>
                                        <Col md={3}></Col>
                                    </Row>
                                </Form.Group>
                                
                            </Form>
                        </Col>
                    </Row>
                    
                </Col>
                <Col md={4}></Col>
            </Row>  
        </Container>
    );
}
export default SuccessPage
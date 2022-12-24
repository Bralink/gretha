import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ApiTorak from "../helpers/ApiTorak/ApiTorak";
import { RegisterModel} from "../models/Acount";
import { useRouter } from "next/router";

export const Register = () =>{
    let router = useRouter();
    const [formValidatedRegister, setFormValidateRegister] = React.useState(false);
    const [dataRegister, setDataRegister] = React.useState<RegisterModel>(new RegisterModel());
    const [error, setError] = React.useState("");

    const validateForm = (event: any) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
    
        if(form.checkValidity()) {
           register();
        }

        setFormValidateRegister(true);
    }

    const register = async() =>{

        let apiTorak = new ApiTorak();
        apiTorak.module = "/services";
        apiTorak.sendData("student", "register", dataRegister).then((response : any) => {
            if(response.status){
               router.push("/registerSuccess/" + response.data);
            }
            else{
                setError(response.error);
            }
        });
        apiTorak.module = "/web";
    }

    return(
        <Container fluid style={{paddingBottom: '0px'}}>
            <Row>
                <Col md={2} >
                </Col>
                <Col md={8}>
                    <div className="formRegister">
                        <Form noValidate validated={formValidatedRegister} onSubmit={validateForm}>
                            <Row>
                                <Col md={12}>
                                    <p style={{textAlign: 'center', paddingBottom: '5px', paddingTop: '20px',color:'white'}}>Registrarse es muy sencillo con un correo electrónico podrá hacerlo</p>
                                    <p style={{textAlign: 'center', paddingBottom: '10px',color:'white'}}> <b>IMPORTANTE: </b>con los datos proporcionados se elaborará una constancia. Por favor,verifique la información.</p>
                                </Col>
                            </Row>
                            <Row md={1} xs={1} lg={1}>
                                <Col>
                                    <div style={{color: 'red', textAlign: 'center',fontSize: '14px', display: error !== '' ? 'block' : 'none'}}>{error}</div>
                                    <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label>Correo electrónico*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    type="email"
                                                    placeholder="email@dominio.com"
                                                    className="shadowInput"
                                                    value={dataRegister.email} 
                                                    onChange={ (event: any) => {
                                                        setDataRegister({
                                                            ...dataRegister,
                                                            email: event.target.value
                                                        });
                                                        setFormValidateRegister(false);
                                                    }} 
                                                    required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Por favor, ingresa un correo válido.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formHorizontalPassword">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label>Contraseña*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    type="password"
                                                    className="shadowInput"
                                                    placeholder="Contraseña"
                                                    value={dataRegister.password} 
                                                    onChange={ (event: any) => {
                                                        setDataRegister({
                                                            ...dataRegister,
                                                            password: event.target.value
                                                        });
                                                        setFormValidateRegister(false);
                                                    }} 
                                                    required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Por favor, ingresa una contraseña.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formHorizontalName">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label>Nombre completo*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    type="text"
                                                    placeholder="Nombre"
                                                    className="shadowInput"
                                                    value={dataRegister.name} 
                                                    onChange={ (event: any) => {
                                                        setDataRegister({
                                                            ...dataRegister,
                                                            name: event.target.value
                                                        });
                                                        setFormValidateRegister(false);
                                                    }}
                                                    required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Por favor, ingresa tu nombre.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>    
                                <Col>
                                    <Form.Group className="mb-3" controlId="formHorizontalLicense">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label>Cédula profesional*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    type="text"
                                                    placeholder="Cédula profesional"
                                                    className="shadowInput"
                                                    value={dataRegister.license} 
                                                    onChange={ (event: any) => {
                                                        setDataRegister({
                                                            ...dataRegister,
                                                            license: event.target.value
                                                        });
                                                        setFormValidateRegister(false);
                                                    }}
                                                    required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Por favor, ingresa tu cédula profesional.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                
                                <Col>
                                    <Form.Group className="mb-3" controlId="formHorizontalState">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label>Estado*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Select
                                                    className="selectForm"
                                                    size="lg"
                                                    value={dataRegister.state}
                                                    onChange={(e:any) =>{
                                                        setDataRegister({
                                                            ...dataRegister,
                                                            state: e.target.value
                                                        });
                                                    }}>
                                                    <option>Aguascalientes</option>
                                                    <option>Baja California</option>
                                                    <option>Baja California Sur </option>
                                                    <option>Campeche</option>
                                                    <option>Chiapas</option>
                                                    <option>Chihuahua</option>
                                                    <option>Ciudad de México</option>
                                                    <option>Coahuila</option>
                                                    <option>Colima</option>
                                                    <option>Durango</option>
                                                    <option>Estado de México</option>
                                                    <option>Guanajuato</option>
                                                    <option>Guerrero</option>
                                                    <option>Hidalgo</option>
                                                    <option>Jalisco</option>
                                                    <option>Michoacán</option>
                                                    <option>Morelos</option>
                                                    <option>Nayarit</option>
                                                    <option>Nuevo León</option>
                                                    <option>Oaxaca</option>
                                                    <option>Puebla</option>
                                                    <option>Querétaro</option>
                                                    <option>Quintana Roo</option>
                                                    <option>San Luis Potosí</option>
                                                    <option>Sinaloa</option>
                                                    <option>Sonora</option>
                                                    <option>Tabasco</option>
                                                    <option>Tamaulipas</option>
                                                    <option>Tlaxcala</option>
                                                    <option>Veracruz</option>
                                                    <option>Yucatán</option>
                                                    <option>Zacatecas</option>
                                                </Form.Select>

                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="formHorizontalinsitute">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label>Institución*</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    type="text"
                                                    placeholder="Institución"
                                                    className="shadowInput"
                                                    value={dataRegister.institution} 
                                                    onChange={ (event: any) => {
                                                        setDataRegister({
                                                            ...dataRegister,
                                                            institution: event.target.value
                                                        });
                                                        setFormValidateRegister(false);
                                                    }}
                                                    required/>
                                                <Form.Control.Feedback type="invalid">
                                                    Por favor, ingresa tu insititución.
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <p style={{textAlign: 'right'}}> *Datos obligatorios </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}></Col>
                                <Col md={6} style={{textAlign: 'center'}}>
                                    <Button type="submit">Registro</Button>
                                </Col>
                                <Col md={3}></Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
                <Col md={2}>
                </Col>
            </Row>

        </Container>
    );
}

export default Register;
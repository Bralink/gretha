import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SemiFooter } from "../templates/templateFooter";
import { LoginModel } from "../models/Acount";
import ApiTorak from "../helpers/ApiTorak/ApiTorak";
import { useRouter } from "next/router";
import { GlobalContext } from "../context/GlobalContext";
import { IGlobalState } from "../interfaces/context/IGlobalState";
import Link from "next/link";

export const Login = () => {
    let router = useRouter();
    const { getGlobalState, setGlobalState} = React.useContext(GlobalContext);
    const [formValidatedLogin, setFormValidateLogin] = React.useState(false);
    const [dataLogin, setDataLogin] = React.useState<LoginModel>(new LoginModel());
    const [error, setError] = React.useState("");

    const validateFormLogin = (event: any) => {
        const form = event.currentTarget;
        setError('');
        event.preventDefault();
        event.stopPropagation();

        if(form.checkValidity()){
           login();
        }

        setFormValidateLogin(true); 
    }

    const login = () => {
        let apiTorak = new ApiTorak();
        
        apiTorak.sendData("Auth", "login", dataLogin).then((response : any) => {
            if(response.status){
                let sessionObject: any = {
                    token: response.data.token,
                    ...response.data.userData
                };

                let globalData: IGlobalState = {
                    token: response.data.token,
                    username: response.data.userData.username,
                    name: response.data.userData.name,
                    permissions: response.data.userData.permissions
                }

                setGlobalState(globalData);
                router.push('/home');
            }
            else{
                setError(response.error);
            }
        });
    }

    return(
        <><Container fluid style={{ paddingBottom: '0px' }}>
            <Row>
                <Col md={2}>
                </Col>
                <Col md={8}>
                    <div className="formLogin"> 
                        <Form noValidate validated={formValidatedLogin} onSubmit={validateFormLogin}>
                            <Row>
                                <Col md={12}>
                                    <p style={{ textAlign: 'center', paddingTop: '20px',paddingBottom: '15px',color:'#383086', fontSize: '17px' }}> <b>Inicio de sesión</b></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div style={{color: 'red', textAlign: 'center',fontSize: '14px', display: error !== '' ? 'block' : 'none'}}>{error}</div>
                                    <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label>Correo electrónico</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="email@dominio.com"
                                                    value={dataLogin.username} 
                                                    className={"shadowInput"}
                                                    onChange={ (event: any) => {
                                                        setDataLogin({
                                                            ...dataLogin,
                                                            username: event.target.value
                                                        });
                                                        setFormValidateLogin(false);
                                                    }}
                                                    required />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="formHorizontalName">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label>Contraseña</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    type="password"
                                                    placeholder="contraseña"
                                                    className="shadowInput"
                                                    value={dataLogin.password} 
                                                    onChange={ (event: any) => {
                                                        setDataLogin({
                                                            ...dataLogin,
                                                            password: event.target.value
                                                        });
                                                        setFormValidateLogin(false);
                                                    }}
                                                    required/>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col> 
                            
                                
                            </Row>
                            <Row>
                                <Col md={3}></Col>
                                <Col md={6} style={{textAlign: 'center'}}>
                                    <Button type="submit">Entrar</Button>
                                </Col>
                                <Col md={3}></Col>
                                <Col md={12} style={{textAlign: 'center'}}>
                                    <Link href="/recoveryPassword">
                                        <a style={{ textAlign: 'center',color:'#7B68EE' }} href="">¿Olvidaste tu contraseña?</a>
                                    </Link>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>
                <Col md={2}>
                </Col>
            </Row>
        </Container><SemiFooter /></>
    );
}

export default Login;
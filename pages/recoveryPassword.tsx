import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SemiFooter } from "../templates/templateFooter";
import { LoginModel, RecoveryPasswordModel } from "../models/Acount";
import ApiTorak from "../helpers/ApiTorak/ApiTorak";
import { useRouter } from "next/router";
import { GlobalContext } from "../context/GlobalContext";
import { IGlobalState } from "../interfaces/context/IGlobalState";
import { NextPage } from "next";
import { data } from "jquery";
import Link from "next/link";

export const RecoveryPassword: NextPage = () => {
    let router = useRouter();
    let apiTorak = new ApiTorak();
    const { getGlobalState, setGlobalState} = React.useContext(GlobalContext);
    const [formValidatedRecovery, setFormValidateRecovery] = React.useState(false);
    const [dataRecovery, setDataRecovery] = React.useState<RecoveryPasswordModel>(new RecoveryPasswordModel());
    const [error, setError] = React.useState("");
    const [currentStep, setCurrentStep] = React.useState<"Step1" | "Step2" | "Step3" | "Step4">("Step1");

    const validateMail= (event: any) => {
        const form = event.currentTarget;
        setError('');
        event.preventDefault();
        event.stopPropagation();

        if(form.checkValidity()){
            apiTorak.module = "/services";
            apiTorak.sendData("student", "SendRecoveryPassword", {username: dataRecovery.username}).then((response : any) => {
                if(response.status){
                setCurrentStep('Step2')
                }
                else{
                    setError(response.error);
                }
            });
            apiTorak.module = "/web";
        }

        setFormValidateRecovery(true); 
    }

    const validateCode = (event: any) => {
        const form = event.currentTarget;
        setError('');
        event.preventDefault();
        event.stopPropagation();

        if(form.checkValidity()){
            apiTorak.module = "/services";
            apiTorak.sendData("student", "ValidateCodeRecovery", {username: dataRecovery.username, code: dataRecovery.code}).then((response : any) => {
                if(response.status){
                setCurrentStep('Step3')
                }
                else{
                    setError(response.error);
                }
            });
            apiTorak.module = "/web";
        }

        setFormValidateRecovery(true); 
    }

    const sendNewPassword = (event: any) => {
        const form = event.currentTarget;
        setError('');
        event.preventDefault();
        event.stopPropagation();

        if(form.checkValidity()){
            if(dataRecovery.password === dataRecovery.confirmPassword){
                apiTorak.module = "/services";
                apiTorak.sendData("student", "saveNewPassword", {username: dataRecovery.username, password: dataRecovery.password}).then((response : any) => {
                    if(response.status){
                        setCurrentStep('Step4')
                    }
                    else{
                        setError(response.error);
                    }
                });
                apiTorak.module = "/web";
            }else{
                setError("Las contraseñas no coinciden");
            }
           
        }

        setFormValidateRecovery(true); 
    }
    
    return(
        <Container>
            <Row>
                <Col md={2}>
                </Col>
                <Col md={8}>
                    {currentStep === 'Step1' && (
                    <div className="formRecovery"> 
                         <Form noValidate validated={formValidatedRecovery} onSubmit={validateMail}>
                             <Row>
                                 <Col md={12}>
                                     <p style={{ textAlign: 'center', paddingTop: '20px',paddingBottom: '15px',color:'#383086', fontSize: '17px' }}> <b>Recuperación de Contraseña</b></p>
                                     <p style={{textAlign: 'center', paddingBottom: '10px',color:'white'}}>Proceso de recuperación de contraseña.</p>
                                 </Col>
                             </Row>
                             <Row>
                                 <Col md={12}>
                                     <div style={{color: 'red', textAlign: 'center',fontSize: '14px', display: error !== '' ? 'block' : 'none'}}>{error}</div>
                                     <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                         <Row>
                                             <Col md={3} style={{textAlign: 'center'}}>
                                                 <Form.Label style={{color: 'white', textAlign: 'center', paddingTop: '8px'}}>Correo electrónico</Form.Label>
                                             </Col>
                                             <Col md={9}>
                                                 <Form.Control
                                                     type="email"
                                                     placeholder="email@dominio.com"
                                                     value={dataRecovery.username} 
                                                     className={"shadowInput"}
                                                     onChange={ (event: any) => {
                                                         setDataRecovery({
                                                             ...dataRecovery,
                                                             username: event.target.value
                                                         });
                                                         setFormValidateRecovery(false);
                                                     }}
                                                     required />
                                             </Col>
                                         </Row>
                                     </Form.Group>
                                 </Col>   
                             </Row>
                             <Row>
                                 <Col md={3}></Col>
                                 <Col md={6} style={{textAlign: 'center'}}>
                                     <Button type="submit">Recuperar</Button>
                                 </Col>
                                 <Col md={3}></Col>
                             </Row>
                         </Form>
                    </div>
                    )}

                    {currentStep === 'Step2' &&(
                    <div className="formRecovery"> 
                        <Form noValidate validated={formValidatedRecovery} onSubmit={validateCode}>
                            <Row>
                                <Col md={12}>
                                    <p style={{ textAlign: 'center', paddingTop: '20px',paddingBottom: '15px',color:'#383086', fontSize: '17px' }}> <b>Recuperación de Contraseña</b></p>
                                    <p style={{textAlign: 'center', paddingBottom: '10px',color:'white'}}>Proceso de recuperación de contraseña.</p>
                                    <p style={{textAlign: 'center', paddingBottom: '10px',color:'white'}}>Envíamos a tu dirección de correo un código de verificación, ingresalo a continuación.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div style={{color: 'red', textAlign: 'center',fontSize: '14px', display: error !== '' ? 'block' : 'none'}}>{error}</div>
                                    <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label style={{color: 'white', textAlign: 'center', paddingTop: '8px'}}>Código</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="number"      
                                                    placeholder="0000"
                                                    onChange={(event:any) => {
                                                        if(event.target.value <= 9999){
                                                            setDataRecovery({
                                                                ...dataRecovery,
                                                                code: event.target.value
                                                            });
                                                            setFormValidateRecovery(false)
                                                        }
                                                    }}
                                                    value={dataRecovery.code > 0 ? dataRecovery.code : undefined}
                                                    required
                                                     />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col>   
                            </Row>
                            <Row>
                                <Col md={3}></Col>
                                <Col md={6} style={{textAlign: 'center'}}>
                                    <Button type="submit">Validar Código</Button>
                                </Col>
                                <Col md={3}></Col>
                            </Row>
                        </Form>
                   </div>
                    )}
                    {currentStep === 'Step3' &&(
                    <div className="formRecovery"> 
                        <Form noValidate validated={formValidatedRecovery} onSubmit={sendNewPassword}>
                            <Row>
                                <Col md={12}>
                                    <p style={{ textAlign: 'center', paddingTop: '20px',paddingBottom: '15px',color:'#383086', fontSize: '17px' }}> <b>Recuperación de Contraseña</b></p>
                                    <p style={{textAlign: 'center', paddingBottom: '10px',color:'white'}}>Proceso de recuperación de contraseña.</p>
                                    <p style={{textAlign: 'center', paddingBottom: '10px',color:'white'}}>Ingresa tu nueva contraseña.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <div style={{color: 'red', textAlign: 'center',fontSize: '14px', display: error !== '' ? 'block' : 'none'}}>{error}</div>
                                    <Form.Group className="mb-3" controlId="formHorizontalEmail">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label style={{color: 'white', textAlign: 'center', paddingTop: '8px'}}>Contraseña</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control
                                                    type="password"      
                                                    placeholder="Contraseña"
                                                    onChange={(event:any) => {
                                                        
                                                        setDataRecovery({
                                                            ...dataRecovery,
                                                            password: event.target.value
                                                        });
                                                        setFormValidateRecovery(false);
                                                        
                                                    }}
                                                    value={dataRecovery.password}
                                                    required
                                                     />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Col> 
                                <Col md={12}>
                                    <Form.Group className="mb-3" controlId="formHorizontalName">
                                        <Row>
                                            <Col md={3} style={{textAlign: 'center'}}>
                                                <Form.Label style={{color: 'white', textAlign: 'center', paddingTop: '8px'}}>Confirmar contraseña</Form.Label>
                                            </Col>
                                            <Col md={9}>
                                                <Form.Control 
                                                    type="password"
                                                    placeholder="Confirmar Contraseña"
                                                    className="shadowInput"
                                                    value={dataRecovery.confirmPassword} 
                                                    onChange={ (event: any) => {
                                                        setDataRecovery({
                                                            ...dataRecovery,
                                                            confirmPassword: event.target.value
                                                        });
                                                        setFormValidateRecovery(false);
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
                                    <Button type="submit">Guardar Nueva Contraseña</Button>
                                </Col>
                                <Col md={3}></Col>
                            </Row>
                        </Form>
                   </div>
                    )}

                    {currentStep === 'Step4' && (
                        <div style={{backgroundColor: '#EBE8EC', borderRadius: '1em', padding: '20px'}}>
                            <Row md={1} xs={1}>
                                <Col>
                                    <p style={{color: 'green', textAlign: 'center', fontWeight: '600'}}>¡Tu contraseña ha sido cambiada!</p>
                                </Col>
                            </Row>
                            <Row md={1} xs={1}>
                                <Col>
                                    <p style={{textAlign: 'center', fontWeight: '400'}}>Ya puedes iniciar sesión con tu nueva contraseña.</p>
                                    <p style={{textAlign: 'center', fontWeight: '500'}}>
                                        <Link href={"/login"}>
                                            <a href="" className="toLogin"> Ir a inicio de sesión</a> 
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    )}
                   
                </Col>
                <Col md={2}>
                </Col>
            </Row>
        </Container>
    );
}

export default RecoveryPassword;
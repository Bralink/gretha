import { NextPage } from "next";
import React from "react";
import { Container, Carousel, Col, Row, Image} from "react-bootstrap";
import { SemiFooter } from "../templates/templateFooter";


export const Home: NextPage = () => {
    return(
        <Container style={{marginTop: '-20px'}} fluid>
           
            <Carousel interval={50000} variant="dark">
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="/images/bgHome.png"
                        alt="Background"
                        fluid
                        style={{height: '500px'}}
                    />
                    <Carousel.Caption style={{height: '90%', width: '85%', left: '90px'}}>
                        <Row>
                            <Col md={4}>
                                <Image  
                                    src="/images/corazon.png"
                                    alt="Corazon"
                                    style={{width: '100%', paddingTop: '25%'}}/>
                            </Col>
                            <Col md={8}>
                                <Row>
                                    <Col md={4}>
                                        <Image src="/images/armstrong.png" alt="Armstrong" style={{width: '100%'}}/>
                                    </Col>
                                    <Col md={8}></Col>
                                </Row>
                                <Row md={1} style={{paddingBottom: '20px', paddingTop: '15px'}}>
                                    <Col>
                                        <p style={{fontSize: '12px', textAlign: 'justify', paddingTop: '20px'}}>
                                            México registra la prevalencia más alta de hipertensión arterial en el mundo debido a la falta de diagnóstico oportuno
                                            y al desconocimiento de los factores de riesgo que pueden detonar esta patología; se estima que uno de cada tres
                                            mexicanos mayores de edad padece hipertensión arterial, causando la muerte a cientos de personas todos los días.
                                        </p>
                                        <p style={{fontSize: '12px', textAlign: 'justify',  paddingTop: '20px'}}>
                                            Armstrong Laboratorios de México junto con el Grupo de Expertos en Hipertensión Arterial México (GREHTA), ofrecen
                                            el presente ciclo de video cápsulas: Hipertensión arterial. Diálogo con los expertos con la firme convicción que el
                                            contenido es de utilidad para el médico, dada la importancia que tiene reconocer y tratar la hipertensión arterial, así
                                            como valorar las diferentes estrategias terapéuticas para esta enfermedad crónica.
                                        </p>
                                    </Col>
                                </Row>
                                <Row className="rowSlider1" >
                                    <Col md={3}>
                                        <p style={{color: '#2c62e9', paddingTop: '20px'}}>Con aval de:</p>           
                                    </Col>
                                    <Col md={3}>
                                        <Image src="/images/logo_asociacion.png" alt="asociacion" style={{width: '40%', paddingTop: '10px'}}/>
                                    </Col>
                                    <Col md={3}>
                                        <Image src="/images/logo_conamege.png" alt="Conamege" style={{width: '70%', paddingTop: '10px'}}/>
                                    </Col> 
                                    <Col md={3}>
                                        <Image src="/images/12puntos.png" alt="12 Puntos" style={{width: '60%', paddingTop: '20px'}}/>
                                    </Col>        
                                </Row>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="/images/bgHome.png"
                        alt="Background"
                        fluid
                        style={{height: '500px'}}
                       
                    />
                    <Carousel.Caption style={{height: '85%', width: '85%', left: '90px'}}>
                        <Row>
                            <Col md={4}>
                                <Image
                                    alt="GREHTA"
                                    style={{width: '100%', paddingTop: '40%'}} 
                                    src={"/images/grehtaSlider.png"} 
                                />
                            </Col>
                            <Col md={8}>
                                <Row md={1} style={{paddingBottom: '20px', paddingTop: '15px'}}>
                                    <Col>
                                        <p style={{fontSize: '12px', textAlign: 'justify', paddingTop: '10px'}}>
                                            <span style={{display: 'block', color: '#e63a52', fontSize: '15px', fontWeight: 'bold', paddingBottom: '5px'}}>GREHTA</span>
                                            Grupo de expertos que surge de la Alianza por un Corazón Saludable con el objetivo principal de disminuir los costos catastróﬁcos que causa la hipertensión arterial en México.
                                            <span style={{display: 'block', fontWeight: 'bold', paddingTop: '15px', textAlign: 'center'}}><a rel="noopener noreferrer" style={{color: '#e63a52', fontSize: '14px'}} href="https://grehta.org/" target="_blank">https://grehta.org/</a></span>
                                        </p>
                                        <p style={{fontSize: '12px', textAlign: 'justify'}}>
                                            <span style={{color: '#2c62e9', fontWeight: 'bold', textAlign: 'left', display: 'block'}}>Misión</span>
                                                Generar estrategias y acciones viables para disminuir los efectos que causa la hipertensión arterial en México.
                                        </p>
                                        <p style={{fontSize: '12px', textAlign: 'justify',  paddingTop: '5px'}}>
                                            <span style={{color: '#2c62e9', fontWeight: 'bold', textAlign: 'left', display: 'block'}}>Visión</span>
                                                Ser la referencia a nivel nacional sobre hipertensión arterial, convertirse en el principal grupo asesor para las autori-dades gubernamentales, académicas, sociedades médicas y la industria.
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="/images/bgHome.png"
                        alt="Background"
                        fluid
                        style={{height: '515px'}}
                        
                    />
                     <Carousel.Caption style={{height: '85%', width: '85%', left: '90px'}}>
                        <Row>
                            <Col md={4}>
                                <Image
                                    alt="RIHTA"
                                    style={{width: '100%', paddingTop: '25%'}} 
                                    src={"/images/rihtaSlider.png"} 
                                />
                            </Col>
                            <Col md={8}>
                                <Row md={1} style={{paddingBottom: '20px', paddingTop: '15px'}}>
                                    <Col>
                                        <p style={{fontSize: '12px', textAlign: 'justify', paddingTop: '10px'}}>
                                            <span style={{display: 'block', color: '#e63a52', fontSize: '15px', fontWeight: 'bold', paddingBottom: '5px'}}>RIHTA</span>
                                            Es la plataforma electrónica mexicana para el registro clínico de pacientes con hipertensión arterial creada e impul-sada por el Grupo de Expertos en Hipertensión Arterial México (GREHTA).
                                        </p>
                                        <p style={{fontSize: '12px', textAlign: 'justify'}}>
                                            Invitamos a los profesionales de la salud a unirse al registro que contribuye a mejorar la atención médica y la inves-tigación clínica sobre HTA en México, registrando a sus pacientes.
                                        </p>
                                        <p style={{fontSize: '12px', textAlign: 'justify'}}>
                                            Es una plataforma innovadora que cuenta con datos complementarios considerando: El daño a órgano blanco | Estimar función renal | Registro domiciliario para perﬁl metabólico | Riesgo cardiovascular | Adherencia al trata-miento | Percepción del paciente sobre la enfermedad
                                        </p>
                                        <p style={{fontSize: '12px', textAlign: 'justify'}}>
                                            Los invitamos a sumarse a RIHTA,  inscribiendo a sus pacientes.
                                            <span style={{display: 'block', color: '#e63a52', fontSize: '15px', fontWeight: '600', paddingTop: '10px', textAlign: 'center'}}>¡Visitanos!</span>
                                            <span style={{display: 'block', fontWeight: 'bold', paddingTop: '15px', textAlign: 'center'}}><a  style={{color: '#e63a52', fontSize: '14px'}} href="https://rihta.org.mx/login.php" target="_blank" rel="noreferrer noopener">https://rihta.org.mx/login.php</a></span>
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src="/images/white.jpg"
                        alt="Background"
                        style={{height: '500px'}}
                        fluid
                    />
                    <Carousel.Caption style={{height: '90%', width: '85%', left: '90px'}}>
                        <Row xs={1} md={3}>
                            <Col style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/29796" style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/angiotrofin.png"
                                        alt="Angiotrofin"
                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col> 
                            <Col style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/20237" style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/isorbid.png"
                                        alt="Isorbid"
                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col> 
                            <Col style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/30725" style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/monocorat.png"
                                        alt="Monocorat"
                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col>
                            <Col style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/15640" style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/braxan.png"
                                        alt="Braxan"
                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col> 
                            <Col style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/23042" style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/valvulan.png"
                                        alt="Valvulan"
                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col> 
                            <Col style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/16929"  style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/armstrong.png"
                                        alt="Glioten"
                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col> 
                            <Col style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/24285" style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/gliotenzide.png"
                                        alt="Gliotenzide"
                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col> 
                            <Col style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/18343" style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/plenacor.png"
                                        alt="Plenacor"
                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col> 
                            <Col style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/29787" style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/vivitar.png"
                                        alt="Vivitar"
                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col> 
                        </Row>
                        <Row >
                            <Col md={4}></Col>
                            <Col md={4} style={{height: '100px'}}>
                                <a href="https://www.actuamed.com.mx/marca/16022" style={{display: 'flex', justifyContent: 'center'}} target="_blank" rel="noopener noreferrer">
                                    <Image  
                                        className="d-block "
                                        src="/images/coraspir.png"
                                        alt="Vivitar"

                                        style={{height: '65px'}}
                                        fluid />
                                </a>
                            </Col>
                            <Col md={4}></Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <Row>
                <Col>
                   
                    
                </Col>
            </Row>
            <SemiFooter/>
        </Container>
    )
}

export default Home;
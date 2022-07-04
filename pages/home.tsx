import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { Container, Carousel, Col, Row} from "react-bootstrap";
import { SemiFooter } from "../templates/templateFooter";


export const Home: NextPage = () => {
    return(
        <Container style={{marginTop: '-20px'}} fluid>
           
            <Carousel  interval={50000} variant="dark">
                <Carousel.Item>
                    <Image
                    className="d-block w-100"
                    src="/bgHome.png"
                    alt="Background"
                    width={"100%"}
                    height={35}
                    priority
                    layout="responsive"
                    />
                    <Carousel.Caption>
                        <Row>
                            <Col md={5}>
                                <Image src="/black.png" width={"80%"} height={"80%"} layout="responsive"/>
                            </Col>
                            <Col md={7}>
                                <Row>
                                    <Col md={12} style={{textAlign: 'left'}}>
                                        <img src="/logo.png" style={{width: '250px', height: '70px'}}/>
                                    </Col>
                                </Row>
                                <Row style={{paddingTop: '20px', paddingBottom: '20px'}}>
                                    <Col md={12}>
                                        <p style={{color: 'white', fontSize: '13px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Cumque ratione voluptates perspiciatis eaque assumenda blanditiis magnam rem porro 
                                            voluptas voluptatibus accusantium aliquid atque accusamus, quibusdam illum repellat. 
                                            Doloribus, explicabo reprehenderit!
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quidem explicabo quasi, architecto quas,
                                            ipsa mollitia, quibusdam non ab deleniti aut laborum perferendis. Odit enim quam nulla velit,
                                            temporibus doloribus!
                                        </p>
                                    </Col>
                                </Row>
                                <Row style={{backgroundColor: 'white', display: 'flex', alignItems: 'center', bottom: '0'}}>
                                    <Col md={3}>
                                        <p className="align-middle" style={{color: '#3e7a96',fontWeight: 'bold',paddingTop: '15px',paddingLeft: '20px', fontSize: '12px'}}>Con aval de: </p>
                                    </Col>
                                    <Col md={2}>

                                    </Col>
                                    <Col md={5}>
                                        <img src="/logo_conamege.png" style={{width: '50%'}}/>
                                    </Col>
                                    <Col md={2}>
                                        <img src="/12pnts.png" style={{width: '100%'}}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./bgHome.png"
                        alt="Background"
                    />
                    <Carousel.Caption>
                    <h5>Second slide label</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="./bgBanner2.png"
                        alt="Background"
                    />
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
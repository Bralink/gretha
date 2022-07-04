import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

export const Footer = () => {
    return(
        <Container fluid>
            <Row style={{backgroundColor: 'purple',fontSize: '12px', paddingTop: '20px', paddingBottom: '0px'}}>
                <Col md={12}>
                    <p style={{textAlign: 'center', color: 'white'}}>Políticas de Privacidad • Todos los derechos reservado • © 2022 ASECOM Asesores en Comunicación Médica Editorial</p>
                </Col>
            </Row>
        </Container>
    )   
}

export default Footer;

export const SemiFooter = () => {
    return(
        <Container fluid style={{paddingTop: '20px'}}>
            <Row>
                <Col md={12}>
                    <p style={{textAlign: 'center'}}>Con el apoyo de:</p>
                </Col>
            </Row>
            <Row>
                <Col md={2}></Col>
                <Col xs md={3}>
                    <Image src="/logo_cardiologia.png" width={"50%"} height={"15%"} layout="responsive"/>
                </Col>
                <Col xs md={3}>
                    <Image src="/logo.png" width={"50%"} height={"15%"} layout="responsive" />
                </Col>
                <Col xs md={3}>
                    <Image src="/logo_asecom.png" width={"50%"} height={"15%"} layout="responsive"/>
                </Col>
            </Row>
        </Container>
    ); 
}
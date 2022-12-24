import Link from "next/link";
import { Col, Container, Image, Row } from "react-bootstrap";

export const Footer = () => {
    return(
        <Container fluid>
            <Row style={{backgroundColor: 'purple',fontSize: '12px', paddingTop: '20px', paddingBottom: '0px'}}>
                <Col md={12}>
                    <p style={{textAlign: 'center', color: 'white'}}><Link href={"/terms_conditions"}><a>Políticas de Privacidad</a></Link> • Todos los derechos reservados • © 2022 ASECOM Asesores en Comunicación Médica Editorial</p>
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
                    <Image src="/images/logo_cardiologia.png" width={"80%"} fluid />
                </Col>
                <Col xs md={3}>
                    <Image src="/images/logo.png" width={"80%"} fluid />
                </Col>
                <Col xs md={3}>
                    <Image src="/images/logo_asecom.png" width={"80%"} fluid />
                </Col>
            </Row>
        </Container>
    ); 
}

import type { NextPage } from 'next';
import { Col, Container, Image, Row } from 'react-bootstrap';

const Instructions: NextPage = () => {
  
  return (
    <Container>
        <Row>
            <Col md={3}></Col>
            <Col md={9}>
                <Image src={"/images/under.png"} height={400}  />
            </Col>
        </Row>
    </Container>
  )
}

export default Instructions;

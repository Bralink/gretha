import { NextPage } from "next";
import { Container, Row, Col, Form, Button} from "react-bootstrap";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import React from "react";
import ApiTorak from "../../helpers/ApiTorak/ApiTorak";
import Link from "next/link";

export const SuccessPage: NextPage = ({id}:any) => {
    const router = useRouter();
    let apiTorak = new ApiTorak();
    const [bandera, setBandera] = React.useState(false);
    const [code, setCode] = React.useState(undefined);
    const [formValidatedCode, setFormValidateCode] = React.useState(false);
    const [error, setError] = React.useState("");
    
    
    const validateCode = async() =>{
        apiTorak.module = "/services";
        await apiTorak.sendData("student", "validateCode",{code: code}).then((response : any) => {
            if(response.status){
                setBandera(true);
            }
            else{
                setError(response.error);
            }
        });  
        apiTorak.module = "/web";  
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
        console.log(id);
    }, [])


    return(
        <Container>
            <Row style={{paddingBottom: '20px'}}>
                <Col md={4}>
                </Col>
                
                    {bandera &&(
                        <Col md={4} style={{backgroundColor: '#EBE8EC', borderRadius: '1em', padding: '20px'}}>
                            <Row md={1} xs={1}>
                                <Col>
                                    <p style={{color: 'green', textAlign: 'center', fontWeight: '600'}}>¡Tu cuenta ha sido activada!</p>
                                </Col>
                            </Row>
                            <Row md={1} xs={1}>
                                <Col>
                                    <p style={{textAlign: 'center', fontWeight: '400'}}>Ya puedes iniciar sesión con tus credeciales del registro</p>
                                    <p style={{textAlign: 'center', fontWeight: '500'}}>
                                        <Link href={"/login"}>
                                            <a href="" className="toLogin"> Ir a inicio de sesión</a> 
                                        </Link>
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    )}
                    {!bandera &&(
                        <Col md={4} style={{backgroundColor: '#EBE8EC', borderRadius: '1em', padding: '20px'}}>
                            <Row md={1} xs={1}>
                                <Col>
                                    <p style={{color: '#e63a52', textAlign: 'center', fontWeight: '600'}}>Tu registro se ha completado, y hemos enviado un codigo de verificación al correo proporcionado, por favor ingresalo a continuacion para que puedas iniciar sesión</p>
                                </Col>
                            </Row>
                            <Row md={1} xs={1}>
                                <Col>
                                    <p style={{color: 'red', textAlign: 'center', fontWeight: '500'}}>{error}</p>
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
                                                    <Button type="submit">Validar</Button>
                                                </Col>
                                                <Col md={3}></Col>
                                            </Row>
                                        </Form.Group>
                                        
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    )}
                    
                
                <Col md={4}></Col>
            </Row>  
        </Container>
    );
}
export default SuccessPage;


// export async function getStaticPaths() {

//     let apiTorak = new ApiTorak();
//     let result: any[] = [];

//     apiTorak.module = "/services";
//     await apiTorak.getJSON("Video", "GetIdsVideo", []).then((response: any) => {
//         result = response.data;
//     });
   
//     return {
//       paths: result.map((post:any) => {
//         return {
//           params: {
//             id: `${post.id}`,
//           },
//         }
//       }),
//       fallback: false,
//     }
//   }

//   export async function getStaticProps({ params }: any) {
//     return {
//       props: params,
//     }
//   }
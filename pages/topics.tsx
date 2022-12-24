import { Container, Row, Col, Card } from "react-bootstrap";
import React, { useEffect } from "react";
import Link from 'next/link';
import ApiTorak from "../helpers/ApiTorak/ApiTorak";
import Module from "../models/Module";

export const Topics = () => {
    const [modules,setModules] = React.useState<Array<Module>>([]);
    let apiTorak = new ApiTorak();
    const urlShow = apiTorak.host!! + "/modules/admin/";

    const getVideos = async () =>{
        apiTorak.module = "/services";
        await apiTorak.sendData("moduleGrehta", "getAll", {}).then((response : any) => {
            setModules(response.data);
        });
        apiTorak.module = "/web";
    }

    useEffect(() => {
        if(modules.length === 0){
            getVideos();
        }
    })

    return(
        <Container>
            <Row>
                <Col md={12}>
                    <p style={{textAlign: 'center', color: '#392d84'}}>
                        <b style={{fontSize: '28px'}}>HIPERTENSIÓN ARTERIAL</b>   
                        <span style={{display: 'block', fontSize: '24px'}}>Diálogo con los expertos</span>
                    </p>
                </Col>
            </Row>
            <Row xs={1} md={2} lg={3}>
                {modules.map((module: Module) => {
                    return <Col key={module.id}>
                    <Card style={{ backgroundColor: module.bg_color, borderRadius: '1.75em', minHeight: '436px'}}>
                        <Card.Img variant="top" style={{padding: '15px', borderRadius: '1.75em'}} src={urlShow + module.url_image} />
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center', color: 'white', marginTop: '-10px', marginBottom: '10px', fontWeight: '600', fontSize: '14px'}}>{module.name}</Card.Title>
                            <Card.Text style={{color: 'white', fontSize: '16px', textAlign: 'center', fontWeight: '600'}}>
                                <Row>
                                    <Col md={12}>
                                        {module.description}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <div style={{paddingRight: '25px', marginLeft: '5px',paddingTop: '10px'}}>
                                            <div>
                                                <p style={{color: 'white', fontSize: '14px', fontWeight:'600', textAlign: 'left'}}> EXPERTOS</p>
                                            </div>
                                            <div style={{color: 'white'}} dangerouslySetInnerHTML={{__html: module.experts}} />
                                        </div>
                                    </Col>
                                </Row>
                                
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="cardFooterPers">
                           
                                {module.videos.length > 0 &&(
                                     <Row>
                                        {module.videos.map((element: any, index: number) => {
                                            
                                            return <Col md={6} key={element} sm={6}>
                                                <Link href={"/video/" + element}>
                                                    <a className="linkVideo" style={{color: module.font_color, paddingLeft: '20px', fontSize: '17px'}}>Parte {index + 1}</a>
                                                </Link>
                                            </Col>
                    
                                        })}
                                    </Row>
                                )}

                                {module.videos.length === 0 &&(
                                    <Row md={1} xs={1}>
                                        <Col><p style={{textAlign: 'center',color: module.font_color, marginBottom: '0px'}}><b>Próximamente</b></p></Col>
                                    </Row>
                                )}
                                
                            
                        </Card.Footer>
                    </Card>
                </Col>
                })}
            </Row>
        </Container>
    );
}

export default Topics;
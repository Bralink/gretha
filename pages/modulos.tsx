import { Container, Row, Col, Image, Card } from "react-bootstrap";
import React, { useContext, useEffect } from "react";
import Link from 'next/link';
import ApiTorak from "../helpers/ApiTorak/ApiTorak";
import Module from "../models/Module";
import { NextPage } from "next";
import Expert from "../models/Expert";
import { GlobalContext } from "../context/GlobalContext";

export const Modulos: NextPage = () => {
    let {getGlobalState} = useContext(GlobalContext);
    const [modules,setModules] = React.useState<Array<Module>>([]);
    let apiTorak = new ApiTorak();
    const urlShow = apiTorak.host!! + "/modules/admin/";
    const [expertsGretha, setExpertsGretha] = React.useState<Expert[]>([]);

    const getVideos = async () =>{
        apiTorak.module = "/services";
        await apiTorak.sendData("moduleGrehta", "getAll", {}).then((response : any) => {
            setModules(response.data);
        });
        apiTorak.module = "/web";
    }

    const getExperts = async() =>{
        apiTorak.module = "/services";
        await apiTorak.sendData("expert", "getAll", {}).then((response : any) => {
            if(response.status){
                setExpertsGretha(response.data);
            }
        });
        apiTorak.module = "/web";
    }

    useEffect( () => {
        if(expertsGretha.length === 0){
            getExperts();
        }
    });

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
            <Row>
                <Col md={12}>
                    <p style={{textAlign: 'left', color: '#392d84'}}>
                        <b style={{fontSize: '26px'}}>Coordinadores</b>   
                    </p>
                </Col>
            </Row>
            <Row style={{padding: '10px'}}>
                <Col md={1}></Col>
                {expertsGretha.map((expert:Expert, index: number) => {
                    return <Col md={index === 0 ? 4 : 6} key={index}>
                    {index <= 1 &&(
                         <div style={{backgroundColor: 'white', borderRadius: '0.75em', padding: '5px', paddingTop: '20px', paddingBottom: '20px', minHeight: '200px'}}>
                         <Row>
                             <Col xs md={index === 0 ? 7 : 4} style={{paddingLeft: index === 0 ? "35px" : '55px', paddingTop: '10px'}}>
                                 <a href={expert.url_profile} style={{width: '100%'}} target="_blank" rel="noreferrer">
                                     <p className="expertRed">{expert.name}</p>
                                     <p className="expertRed">{expert.p_last_name}</p>
                                     <p className="expertRed">{expert.m_last_name}</p>
                                     <p className="expertSpeci">{expert.speciality}</p>
                                 </a>
                             </Col>
                             <Col xs md={index === 0 ? 5 : 4} style={{paddingRight: "10px"}}>
                                     <Image style={{borderRadius: '7em', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} width={150} height={150} alt="expert" fluid src={urlShow + expert.url_image}/>
                             </Col>
                             {index === 1 &&(
                                <Col xs md={4} style={{paddingRight: "10px"}}>
                                    <p className="expertSpeci" style={{paddingRight: '10px', fontSize: '14px'}}>Master Training de la BIHS (Sociedad Británica e Irlandesa de Hipertensión).</p>
                                </Col>
                             )}
                         </Row>
                     </div>
                    )}
                   
                </Col>

                })}
            </Row>
            <Row xs={1} md={2} lg={3}>
                {modules.map((module: Module) => {
                    return <Col key={module.id} style={{paddingBottom: '20px'}}>
                    <Card style={{ backgroundColor: '#e6e6e6', borderRadius: '1.75em', boxShadow: '3px 3px 3px 3px darkgray', minHeight: '465px'}}>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center', color: '#392e83', marginTop: '10px', marginBottom: '10px', fontWeight: '700', fontSize: '17px'}}>{module.name}</Card.Title>
                            <Card.Text style={{color: '#2c62e9', fontSize: '16px', textAlign: 'center', fontWeight: '600', paddingTop: '7px'}}>
                                <Row>
                                    <Col md={12}>
                                        <p  style={{fontWeight: '700'}}>
                                            {module.description}
                                        </p>  
                                    </Col>
                                </Row>
                                    <Card.Img variant="top" style={{padding: '5px', borderRadius: '1.75em',width: '50%'}} src={urlShow + module.url_image} />
                                <Row>
                                    <Col md={12}>
                                        <div style={{paddingRight: '25px', marginLeft: '5px',paddingTop: '5px'}}>
                                            <div>
                                                <p style={{color: '#392e83', fontSize: '14px', fontWeight:'700', textAlign: 'center'}}> EXPERTO</p>
                                            </div>
                                            <div style={{color: '#392e83'}} dangerouslySetInnerHTML={{__html: module.experts}} />
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
                                                <Link href={getGlobalState().token !== '' ? "/video/" + element : "/login"}>
                                                    <a className="linkVideo" style={{color: '#e63a52', paddingLeft: '25px', fontSize: '17px', fontWeight: 'bold'}}>Cápsula {index + 1}</a>
                                                </Link>
                                            </Col>
                    
                                        })}
                                    </Row>
                                )}

                                {module.videos.length === 0 &&(
                                    <Row md={1} xs={1}>
                                        <Col><p style={{textAlign: 'center',color: '#e63a52', marginBottom: '0px', fontWeight: 'bold'}}><b>Próximamente</b></p></Col>
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

export default Modulos;
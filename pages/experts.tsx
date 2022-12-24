import React, { useEffect } from "react";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import ApiTorak from "../helpers/ApiTorak/ApiTorak";
import Expert from "../models/Expert";

export const Experts = () => {
    let apiTorak = new ApiTorak();
    const urlShow = apiTorak.host!! + "/modules/admin/";
    const [expertsGretha, setExpertsGretha] = React.useState<Expert[]>([]);

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
                <Col md={2}></Col>
                {expertsGretha.map((expert:Expert, index: number) => {
                    return <Col md={4} key={index}>
                    {index <= 1 &&(
                         <div style={{backgroundColor: '#e9e9e9', borderRadius: '0.75em', padding: '5px', paddingTop: '20px', paddingBottom: '20px', minHeight: '480px'}}>
                         <Row>
                             <Col xs md={7} style={{paddingLeft: "35px", paddingTop: '35px'}}>
                                 <a href={expert.url_profile} style={{width: '100%'}} target="_blank" rel="noreferrer">
                                     <p className="expertRed">{expert.name}</p>
                                     <p className="expertRed">{expert.p_last_name}</p>
                                     <p className="expertRed">{expert.m_last_name}</p>
                                     <p className="expertSpeci">{expert.speciality}</p>
                                 </a>
                             </Col>
                             <Col xs md={5} style={{paddingRight: "10px"}}>
                                     <Image style={{borderRadius: '7em', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} width={150} height={150} alt="expert" fluid src={urlShow + expert.url_image}/>
                             </Col>
                         </Row>
                         <Row>
                             <Col md={12}>
                                 <div style={{paddingRight: '25px', marginLeft: '-15px'}}>
                                     <div style={{color: 'purple'}} dangerouslySetInnerHTML={{__html: expert.body}} />
                                 </div>
                                 
                             </Col>
                         </Row>
                     </div>
                    )}
                   
                </Col>

                })}
            </Row>
            <Row>
                <Col md={12}>
                    <p style={{textAlign: 'left', color: '#392d84'}}>
                        <b style={{fontSize: '26px'}}>Expertos</b>   
                    </p>
                </Col>
            </Row>
            <Row xs={1} sm={2} md={3} lg={3} style={{padding: '10px'}}>
                {expertsGretha.map((expert:Expert, index: number) => {
                    return index > 1 &&(
                        <Col key={index}>
                         <div style={{backgroundColor: '#e9e9e9', borderRadius: '0.75em', padding: '5px', paddingTop: '20px', paddingBottom: '20px', minHeight: '480px'}}>
                         <Row>
                             <Col xs md={7} style={{paddingLeft: "35px", paddingTop: '35px'}}>
                                 <a href={expert.url_profile} style={{width: '100%'}} target="_blank" rel="noreferrer">
                                     <p className="expertRed">{expert.name}</p>
                                     <p className="expertRed">{expert.p_last_name}</p>
                                     <p className="expertRed">{expert.m_last_name}</p>
                                     <p className="expertSpeci">{expert.speciality}</p>
                                 </a>
                             </Col>
                             <Col xs md={5} style={{paddingRight: "10px"}}>
                                     <Image style={{borderRadius: '7em', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} width={150} height={150} alt="expert" fluid src={urlShow + expert.url_image}/>
                             </Col>
                         </Row>
                         <Row>
                             <Col md={12}>
                                 <div style={{paddingRight: '25px', marginLeft: '-15px'}}>
                                     <div style={{color: 'purple'}} dangerouslySetInnerHTML={{__html: expert.body}} />
                                 </div>
                                 
                             </Col>
                         </Row>
                     </div>
                    </Col>
                    )
                })}
            </Row>
        </Container>
    );
}

export default Experts;
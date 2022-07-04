import Image from "next/image";
import React, { useEffect } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
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
            <Row xs={1} sm={2} md={3} lg={3} style={{padding: '10px'}}>
                {expertsGretha.map((expert:Expert, index: number) => {
                    return <Col md={4} key={index}>
                    <div style={{backgroundColor: 'lightgray', borderRadius: '0.75em', padding: '5px', paddingTop: '20px', paddingBottom: '20px'}}>
                        <Row>
                            <Col xs md={8} style={{paddingLeft: "30px"}}>
                                <a href={expert.url_profile} style={{width: '100%'}} target="_blank" rel="noreferrer">
                                    <p className="expertRed">{expert.name}</p>
                                    <p className="expertBlue">{expert.p_last_name}</p>
                                    <p className="expertRed">{expert.m_last_name}</p>
                                    <p className="expertSpeci">{expert.speciality}</p>
                                </a>
                            </Col>
                            <Col xs md={4} style={{paddingRight: "30px"}}>
                                <Stack gap={3} style={{height: '100%'}}>
                                    <div style={{height: '10%'}}></div>
                                    <Image style={{borderRadius: '7em', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} width={3} height={3} layout="responsive" src={urlShow + expert.url_image}/>
                                    <div></div>
                                </Stack>
                            </Col>
                        </Row>
                    </div>
                </Col>

                })}
            </Row>
        </Container>
    );
}

export default Experts;
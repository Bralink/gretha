import { Container, Row, Col, Card } from "react-bootstrap";
import React, { useEffect } from "react";
import Link from 'next/link';
import Video from "../models/Video";
import ApiTorak from "../helpers/ApiTorak/ApiTorak";

export const Topics = () => {
    const [videos,setVideos] = React.useState<Array<Video>>([]);
    let apiTorak = new ApiTorak();

    const getVideos = async () =>{
        apiTorak.module = "/services";
        await apiTorak.sendData("video", "getAll", {}).then((response : any) => {
            if(response.status){
                setVideos(response.data);
            }
        });
        apiTorak.module = "/web";
    }

    useEffect(() => {
        if(videos.length === 0){
            getVideos();
        }
    })

    return(
        <Container>
            <Row xs={1} md={2} lg={3}>
                {videos.map((video: Video) => {
                    return <Col key={video.id}>
                    <Card style={{ backgroundColor: '#ec7d52', borderRadius: '1.75em', minHeight: '436px'}}>
                        <Card.Img variant="top" style={{padding: '15px', borderRadius: '1.75em'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbFk9M6A_luCFejcZHvRtYm2VgICt-U5lyEQ&usqp=CAU" />
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center', color: 'red', marginTop: '-20px', marginBottom: '20px'}}>{video.name}</Card.Title>
                            <Card.Text style={{color: 'white', fontSize: '12px'}}>
                                {video.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="cardFooterPers">
                            <Row>
                                <Col md={6} sm={6}>
                                    <span style={{color: 'white', textAlign: 'center', fontSize: '12px'}}>{video.date}</span>
                                </Col>
                                <Col md={6} sm={6}>
                                    <Link href={"/video/" + video.id}>
                                        <a className="linkVideo">Ver video</a>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
                })}
            </Row>
        </Container>
    );
}

export default Topics;
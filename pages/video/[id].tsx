import { NextPage } from "next";
import { Container, Row, Col} from "react-bootstrap";
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from "react";
import React from "react";
import "plyr-react/plyr.css";
import Plyr, { APITypes }  from "plyr-react";
import Video, { SectionVideo, UserSeen } from "../../models/Video";
import ApiTorak from "../../helpers/ApiTorak/ApiTorak";
import { GlobalContext } from "../../context/GlobalContext";

export const VideoPage: NextPage = () => {
    let {getGlobalState} = useContext(GlobalContext);
    const router = useRouter();
    const { id } = router.query;
    let idVideo = parseInt(id!!);
    let apiTorak = new ApiTorak();
    const ref = useRef<APITypes>(null);
    let bandera = false;
    const urlShow = apiTorak.host!! + "/modules/admin/";
    const [dataVideo, setDataVideo] = React.useState<Video>(new Video());
    const [dataSeen, setDataSeen] = React.useState<UserSeen>(new UserSeen());
    let markersVideo: Array<{time: number, label:string}> = [];    
    
    const getData = async() =>{
        if(getGlobalState().username === ''){ 
            router.push("/login");
        }else{
            await apiTorak.sendData("video", "getVideo", {idVideo: idVideo}).then((response : any) => {
                if(response.status){
                    setDataVideo(response.data);
                }
                else{
                    if(response.error === -1){
                        router.push("/login");
                    }
                }
            });
        }
        
    }

    const setVideoSeen = (e:any) => {
        e.preventDefault();
        setDataSeen({
            ...dataSeen,
            time_seen: ref.current!!.plyr.currentTime,
            video: dataVideo.id
        });
    }

    const saveUserVideo = async() => {
         await apiTorak.sendData("video", "saveUserVideo", dataSeen).then((response : any) => {
            if(response.status){
                router.push("/quest/" + dataVideo.evaluation_id);
            }
        });
    }

    const timeUpdate:any = (time: number) => {
        ref.current!!.plyr.currentTime = time;
        setOnPlay();
    }

    const setOnPlay = () =>{
        if((ref.current!!.plyr.on !== undefined) && !bandera){
            ref.current!!.plyr.on("play", (event: any) => {
                setDataSeen({
                    ...dataSeen,
                    seen_video: 1
                });
            });
            bandera = true;
            
        }  
    }

    useEffect(() => {
        
        if(dataVideo.id !== idVideo){
            getData();
        }

        if(id === undefined || idVideo === null){
            let {id} = router.query;
            idVideo = parseInt(id!!);
            
        }
    });

    useEffect(() => {
        if(dataSeen.video !== 0 && dataSeen.seen_video !== undefined){
            saveUserVideo();
        }
    });


    return(
        <Container>
            <Row>
               <Col md={9}>
                    <Plyr
                        ref={ref}
                        source={{
                            type: "video",
                            sources: [{ src:urlShow + dataVideo.url_video}],
                        }}
                        
                    />
               </Col> 
               <Col md={3} style={{backgroundColor: '#ef7953', overflowY: 'scroll', maxHeight: '400px', borderRadius: '.75em'}}>
                    <Row style={{color: 'white',backgroundColor: '#e63a52',textAlign: 'center', borderBottom: '1px solid lightgray'}} xs={2} md={2} >
                        <Col md={12}>Secciones</Col>
                    </Row>
                    {dataVideo.sections !== undefined ? dataVideo.sections.map((element: SectionVideo) => {
                        return <Row style={{color: 'white',textAlign: 'center',borderBottom: '1px solid lightgray'}} xs={1} md={1} key={element.id}>
                            <Col><button className="buttonTopic" onClick={() => timeUpdate(element.start)}>{element.topic}</button></Col>
                        </Row>
                    }): ''}
                    {dataVideo.is_user_answered === 0
                        ? (<Row style={{color: 'white',textAlign: 'center'}}  >
                                <Col md={12}>
                                    <a onClick={setVideoSeen} className="linkQuest">Ir al cuestionario</a>
                                </Col>
                            </Row>)
                        : (<Row style={{color: 'white',textAlign: 'center'}}  >
                                <Col md={12}>
                                    <span>Evaluación Realizada</span>    
                                </Col>
                        </Row>)
                    
                    } 
               </Col>
            </Row>  
        </Container>
    );
}
export default VideoPage;
import { NextPage } from "next";
import { Container, Row, Col, Button, ProgressBar} from "react-bootstrap";
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from "react";
import React from "react";
import "plyr-react/plyr.css";
import Plyr, { APITypes }  from "plyr-react";
import Video, { SectionVideo, UserSeen } from "../../models/Video";
import ApiTorak from "../../helpers/ApiTorak/ApiTorak";
import { GlobalContext } from "../../context/GlobalContext";
import PlyrModel from "../../models/PlyrModel";



export const VideoPage: NextPage = ({ id }: any) => {
    let {getGlobalState} = useContext(GlobalContext);
    const router = useRouter();
    let apiTorak = new ApiTorak();
    const [helpers, setHelpers] = React.useState<{currentTime: number,isHalfPast: boolean}>({currentTime: 0, isHalfPast: false});
    const ref = useRef<APITypes>(new PlyrModel());
    const urlShow = apiTorak.host!! + "/modules/admin/";
    const [dataVideo, setDataVideo] = React.useState<Video>(new Video());
    const [dataSeen, setDataSeen] = React.useState<UserSeen>(new UserSeen());
    const [disabledSections, setDisabledSections] = React.useState(true);
    const [partCalc, setPartCalc] = React.useState(0) ; 

    function camelize(str: string) {
        return str.replace(/(?:^\w|[A-ZÀ-Ú]|\b\w)/g, function(word, index) {
            return index === 0 ? word : word.toLowerCase();
        }).replace(/\s+/g, '');
    }

    const getData = async() =>{
        if(getGlobalState().username === ''){ 
            router.push("/login");
        }else{
            await apiTorak.sendData("video", "getVideo", {idVideo: id}).then((response : any) => {
                if(response.status){
                    setDataVideo({...response.data});
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
            seen_video: ref.current!!.plyr.isPlayed ? 1 : 0,
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
        if(helpers.isHalfPast){
            ref.current!!.plyr.play();
        } 
    }

    useEffect(() => {
        if (ref.current){
          setTimeout(() => {
            (ref.current?.plyr as Plyr).on("play", () => {
                ref.current!!.plyr.isPlayed = true;
                setHelpers({
                    currentTime: ref.current!!.plyr.currentTime,
                    isHalfPast: true
                });
                setDisabledSections(false);
            });
          }, 1000);  
        } 
    }, [ref]);

    useEffect(() => {
        if(dataSeen.video !== 0 && dataSeen.seen_video !== undefined){
            saveUserVideo();
        }
    },[dataSeen]);

    useEffect(() => {
        if(id > 0 && dataVideo.id === 0){
            getData();
        }
    });

    useEffect(() => {
        let calc = Math.round((dataVideo.part * 100) / 24);
        setPartCalc(calc);
    },[dataVideo]);

    useEffect(() => {
        setTimeout(() => {
            timeUpdate(1);
        }, 100);
    },[helpers]);

    return(
        <Container>
            <Row>
                <Col md={7}></Col>
                <Col md={1} xs={1} style={{textAlign: 'right'}}>                    
                        0%
                </Col>
                <Col xs={3} md={3}>
                    <Row xs={1} md={1}>
                        <Col style={{paddingTop: '5px'}}>
                            <ProgressBar min={0} max={100} variant={"danger"} label={`${partCalc}%`} now={partCalc}/>
                        </Col>
                    </Row>
                    <Row xs={1} md={1}>
                        <Col style={{textAlign: 'center'}}>{camelize(dataVideo.modulo)} de 12 Módulos</Col>
                    </Row>
                </Col>
                <Col md={1} xs={1} style={{textAlign: 'left'}}>                    
                    100%
                </Col>
                
            </Row>
            <Row>
                <Col md={9}>
                    <Row xs={1} md={1}>
                        <Col>
                            <Plyr
                                ref={ref}
                                preload="none"
                                source={{
                                    type: "video",
                                    sources: [{ src:urlShow + dataVideo.url_video}],
                                }}
                                
                            />
                        </Col>
                    </Row>
                    <Row xs ={1} md={1}>
                        <Col style={{backgroundColor: '#e73952', borderRadius: '0.5em', marginRight: '5px'}}>
                            {dataVideo.is_answered !== 3
                            ? (<Row style={{color: 'white',textAlign: 'center', paddingTop: '10px'}}  >
                                    <Col style={{backgroundColor: ''}}>
                                        <a onClick={setVideoSeen} className="linkQuest">Aplicar evaluación (Intento {dataVideo.is_answered + 1} de 3) </a>
                                    </Col>
                                </Row>)
                            : (<Row style={{color: 'white',textAlign: 'center',paddingTop: '10px'}}  >
                                    <Col>
                                        <span>Evaluación Realizada</span>    
                                    </Col>
                            </Row>)
                        
                        } 
                        </Col>
                    </Row>
                    
               </Col> 
               <Col md={3} className="sectionsContainer">
                    <Row xs={1} md={1}>
                        <Col>
                            <Row style={{color: 'white',backgroundColor: '#e63a52',textAlign: 'center', borderRadius: '0.75em'}} xs={2} md={2} >
                                <Col md={12} style={{paddingTop: '10px'}}>Secciones</Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="rowSections" xs={1} md={1} lg={1}>
                        {dataVideo.sections !== undefined ? dataVideo.sections.map((element: SectionVideo) => {
                            return <Col key={element.id} style={{borderBottom: '1px solid lightgray'}}><button disabled={disabledSections} className="buttonTopic" onClick={() => timeUpdate((element.minute * 60) + element.second)}>{element.topic}</button></Col>
                            
                        }): ''}
                    </Row>
               </Col>
            </Row>  
        </Container>
    );
}
export default VideoPage;

export async function getStaticPaths() {

    let apiTorak = new ApiTorak();
    let result: any[] = [];

    apiTorak.module = "/services";
    await apiTorak.getJSON("Video", "GetIdsVideo", []).then((response: any) => {
        result = response.data;
    });
   
    return {
      paths: result.map((post:any) => {
        return {
          params: {
            id: `${post.id}`,
          },
        }
      }),
      fallback: false,
    }
  }

  export async function getStaticProps({ params }: any) {
    return {
      props: params,
    }
  }
  
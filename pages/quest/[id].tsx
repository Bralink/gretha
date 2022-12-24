import { NextPage } from "next";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import React from "react";
import ApiTorak from "../../helpers/ApiTorak/ApiTorak";
import Quest, { Answer, Question, UserAnswer } from "../../models/Quest";
import { GlobalContext } from "../../context/GlobalContext";
import Link from "next/link";

export const QuestPage:NextPage = ({id}:any) => {
    const router = useRouter();
    const {getGlobalState} = React.useContext(GlobalContext);
    let apiTorak = new ApiTorak();
    const [error, setError] = React.useState("");
    const [finished,setFinished] = React.useState(false);
    const [dataQuest, setDataQuest] = React.useState<Quest>(new Quest());
    const [currentQuestion, setCurrentQuestion] = React.useState<Question>(new Question());
    const [countQuestion,setCountQuestion] = React.useState(1);
    const [answer, setAnswer] = React.useState<UserAnswer>(new UserAnswer());
    const [results,setResults] = React.useState<{questions: number, answers: number}>({questions: 0, answers: 0});

    const getData = async() =>{
        if(getGlobalState().username === ""){
            router.push("/login");
        }else{
            await apiTorak.sendData("evaluation", "getCompleteQuest", {idEvaluation: id}).then((response : any) => {
                if(response.status){
                    setDataQuest(response.data);
                }else{
                    if(response.error === -1){
                        router.push("/login");
                    }
                }
            });
        }
        
    }

    const nextQuestion = async() => {
        if(countQuestion <= dataQuest.questions && dataQuest.user_answers <= dataQuest.questions){
            await apiTorak.sendData("evaluation", "getQuestion", {idEvaluation: id}).then((response : any) => {
                if(response.status){
                    setCurrentQuestion(response.data);
                    setCountQuestion(response.data.user_answers + 1);
                }else{
                    if(response.error === -1){
                        router.push("/login");
                    }else{
                        console.log(response.error);
                    }
                }
            });
        }else{
            setCountQuestion(dataQuest.questions);
        }
        
    }

    const getResults = async() =>{
       
        await apiTorak.sendData("evaluation", "getResults", {idEvaluation: id}).then((response : any) => {
            if(response.status){
                setResults({questions: response.data.questions, answers: response.data.corrects});
            }
        });
    }

    

    const setAnwser = (evaluation: number,question: number, answer: number, answer_text: string) => {
        setAnswer({
            evaluation: evaluation,
            question: question ,
            answer:  answer,
            answer_text: answer_text
        });
        setError("");
    }

    const saveAnswer = async(e:any) => {
        e.preventDefault();
        if(answer.answer !== 0 && answer.answer_text !== ''){
            await apiTorak.sendData("evaluation", "saveAnswer", answer).then((response : any) => {
                if(response.status){
                    nextQuestion();
                    setCountQuestion(response.data.total);
                }
            });
        }else{
            setError("Debes seleccionar una respuesta");
        }
        
    }

    const finishQuest = async(e:any) => {
        e.preventDefault();
    
        await apiTorak.sendData("evaluation", "finishQuest", answer).then((response : any) => {
            if(response.status){
                setFinished(true);
                getResults();
            }
        });
    }

    useEffect(() => {
        if(id > 0 && dataQuest.id === 0){
            getData();
        }
    },[]);

    useEffect(() => {
        nextQuestion();
    }, [dataQuest]);

    useEffect(() => {
        if((currentQuestion.id === null && dataQuest.is_answered === 3)){
            setFinished(true);
            getResults();
        }
    },[currentQuestion]);

    return(
        <Container>
            {!finished && (
                <Row style={{paddingBottom: '10px'}}>
                    <Col md={1}></Col>
                    <Col md={10} style={{border: '1px solid lightgray', borderRadius: '1.75em', padding: '20px'}}>
                        <Row>
                            <Col md={3}><p style={{fontSize: '11px', color: 'gray'}}><b>Pregunta {countQuestion} de {dataQuest.questions}</b></p></Col>
                            <Col md={6} style={{textAlign: 'center', fontSize: '14px', color: 'gray'}}> Intento {dataQuest.is_answered + 1}</Col>
                            <Col md={3}><p style={{fontSize: '14px',textAlign: 'right', color: '#027ab8'}}><b>{dataQuest.name}</b></p></Col>
                        </Row>
                        <Row>
                            <Col> <p style={{fontSize: '18px'}}><b>{currentQuestion.question}</b></p></Col>
                        </Row>
                        <Row>
                            <Col> <p style={{fontSize: '15px', color: 'red'}}><b>{error}</b></p></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form>    
                                    {currentQuestion.answers.map((answer: Answer ) => {
                                        return <Form.Check 
                                            type="radio"
                                            key={answer.id}
                                            name={currentQuestion.question}
                                            style={{fontSize: '15px'}}
                                            id={"answer-" + answer.id}
                                            onChange={() => setAnwser(answer.evaluation,answer.question, answer.id, " ")}
                                            label={answer.answer}
                                        />
                                    })
                                    }
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}></Col>
                            {countQuestion === dataQuest.questions
                                ?(
                                    <Col md={3}><Button variant='success' onClick={finishQuest}>Finalizar</Button></Col>
                                )
                                :(
                                    <Col md={3}><Button variant='primary' onClick={saveAnswer}>Siguiente</Button></Col>
                                )

                            }
                            
                            <Col md={4}></Col>
                        </Row>
                    </Col>
                    <Col md={2}></Col>
                </Row>
            )}

            {finished &&(
                <Row style={{paddingBottom: '10px'}}>
                <Col md={1}></Col>
                <Col md={10} style={{border: '1px solid lightgray', borderRadius: '1.75em', padding: '20px'}}>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={6}><p style={{fontSize: '16px',textAlign: 'center', color: 'green'}}><b>Evaluación Concluida</b></p></Col>
                        <Col md={3}></Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{color: '#e63a52', textAlign: 'center'}}>
                                ¡Ha finalizado la evaluación!
                            </p>
                            <p style={{color: '#11426a', textAlign: 'center', fontSize: '17px'}}>
                                Su Puntaje es: 
                            </p>
                            <p style={{color: '#11426a', textAlign: 'center', fontSize: '17px', fontWeight: 'bold'}}>
                                {results.answers} correctas de {results.questions} preguntas
                            </p>
                            <p style={{color: '#e63a52',textAlign: 'center'}}>
                                Ha realizado {dataQuest.is_answered + 1} de 3 intentos
                            </p>
                            <p style={{color: '#e63a52',textAlign: 'center'}}>
                                Le recordamos que tiene 3 intentos para lograr mejor puntaje
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}></Col>
                        <Col md={4}>
                            <Link href={"/modulos"}>
                                <a href="" className="toTopics"> Ir a Módulos</a> 
                            </Link>
                        </Col>
                        
                        <Col md={3}></Col>
                    </Row>
                </Col>
                <Col md={2}></Col>
            </Row>
            )}
        </Container>
    );
}

export default QuestPage;

export async function getStaticPaths() {

    let apiTorak = new ApiTorak();
    let result: any[] = [];

    apiTorak.module = "/services";
    await apiTorak.getJSON("Evaluation", "GetIdsQuest", []).then((response: any) => {
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
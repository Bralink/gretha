import { NextPage } from "next";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import React from "react";
import ApiTorak from "../../helpers/ApiTorak/ApiTorak";
import Quest, { Answer, Question, UserAnswer } from "../../models/Quest";
import { GlobalContext } from "../../context/GlobalContext";
import Link from "next/link";

export const QuestPage:NextPage = () => {
    const router = useRouter();
    const {getGlobalState} = React.useContext(GlobalContext);
    const { id } = router.query;
    let idEvaluation = parseInt(id!!.toString());
    let apiTorak = new ApiTorak();
    const [error, setError] = React.useState("");
    const [finished,setFinished] = React.useState(false);
    const [dataQuest, setDataQuest] = React.useState<Quest>(new Quest());
    const [currentQuestion, setCurrentQuestion] = React.useState<Question>(new Question());
    const [countQuestion,setCountQuestion] = React.useState(0);
    const [answer, setAnswer] = React.useState<UserAnswer>(new UserAnswer());

    const getData = async() =>{
        if(getGlobalState().username === ""){
            router.push("/login");
        }else{
            await apiTorak.sendData("evaluation", "getCompleteQuest", {idEvaluation: idEvaluation}).then((response : any) => {
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
        if(countQuestion < dataQuest.questions && dataQuest.user_answers < dataQuest.questions){
            await apiTorak.sendData("evaluation", "getQuestion", {idEvaluation: idEvaluation}).then((response : any) => {
                if(response.status){
                    setCurrentQuestion(response.data);
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

    useEffect(() => {
        if(dataQuest.id !== idEvaluation){
            getData();
        }
    });

    useEffect(() => {
        nextQuestion();
    }, [dataQuest]);

    useEffect(() => {
        setCountQuestion(dataQuest.user_answers + 1);
    }, [dataQuest.user_answers]);
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
            }
        });
    }

    return(
        <Container>
            {!finished && (
                <Row style={{paddingBottom: '10px'}}>
                    <Col md={1}></Col>
                    <Col md={10} style={{border: '1px solid lightgray', borderRadius: '1.75em', padding: '20px'}}>
                        <Row>
                            <Col md={3}><p style={{fontSize: '11px', color: 'gray'}}><b>Pregunta {countQuestion} de {dataQuest.questions}</b></p></Col>
                            <Col md={6}></Col>
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
                        <Col md={6}><p style={{fontSize: '16px',textAlign: 'center', color: 'green'}}><b>Cuestionario Terminado</b></p></Col>
                        <Col md={3}></Col>
                    </Row>
                    <Row>
                        <Col>
                            <p style={{color: '#e63a52', textAlign: 'center'}}>
                                ¡Has Finalizado el cuestionario correctamente!
                            </p>
                            <p style={{color: '#e63a52',textAlign: 'center'}}>
                                Puedes regresar a tópicos y revisar si hay mas cuestionarios disponibles
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={5}></Col>
                        <Col md={4}>
                            <Link href={"/topics"}>
                                <a href="" className="toTopics"> Ir a Tópicos</a> 
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
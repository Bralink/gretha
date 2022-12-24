import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Link from 'next/link'
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GlobalContext} from "../context/GlobalContext";
import useStorage from "../helpers/useStorage/useStorage";

export const TemplateHeader = ({children} : any) => {
    const [activeNav, setActiveNav] = React.useState("Home");
    const [isLogged, setIsLogged] = React.useState(false);
    let {getGlobalState} = useContext(GlobalContext);
    const router = useRouter();

    const setNav = (nav: string) => {
            switch (nav) {
                case "/home":
                    setActiveNav("Home")
                    break;
                case "/modulos":
                    setActiveNav("Modulos")
                    break;
                case "/experts":
                    setActiveNav("Experts")
                    break;
                case "/register":
                    setActiveNav("Register")
                    break;
                case "/login":
                    setActiveNav("Login")
                    break;
                case "/contact":
                    setActiveNav("Contact")
                    break;
                case "/instructions":
                    setActiveNav("Instructions")
                    break;
            }

    }

    const logout = () => {
        let {removeItem} = useStorage();
        removeItem("globalState");
        setIsLogged(false);
        router.push("/login");
    }
    
    useEffect(() => {
        setNav(router.pathname);
    }, [router.pathname]);

    useEffect(() => {
        if(getGlobalState().username !== "" && getGlobalState().username !== undefined){
            setIsLogged(true);
        }else{
            setIsLogged(false);
        }
        
        
    }, [getGlobalState()])
   
    return(
        <>
        <Container fluid style={{paddingBottom: '10px'}}>
            <Head>
                <title>{activeNav}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://www.google.com/recaptcha/api.js?render=427774520382-bl6tbbai6umlp4s44qp81bt3f1n9hav7.apps.googleusercontent.com"></script>
            </Head>
        
            <Row style={{height: '40px', backgroundColor: '#ef7953'}}>
                
            </Row>
            <Row style={{backgroundColor: 'white'}}>
                <Col md={9}  className="logo" style={{paddingTop: '5px', paddingBottom: '5px'}}>
                    <Link href="/home" >
                        <a>
                            <img src={"/images/logo_grehta.png"} width={160} height={60} style={{padding: '10px'}} alt="logo"/>
                            <img src={"/images/logo.png"} width={160} height={60} style={{padding: '10px'}} alt="logo"/>
                        </a>
                    </Link>
                    
                </Col>
                <Col md={3} style={{display: 'flex', alignContent: 'center'}}>
                    {isLogged &&(
                        
                        <Link href="/modulos" >
                            <a style={{color: '#2c62e9', fontSize: '16px', paddingTop: '20px'}}>Hola, {getGlobalState().name}</a>
                        </Link>
                        
                    )}
                </Col>
               
            </Row>
            <Row style={{backgroundColor: '#e63a52'}}>
                <Navbar expand="lg">
                    <Container>
                        <Row>
                            <Col md={12} sm={9} xs={9} style={{paddingTop: '5px'}}>
                                <Navbar.Brand className="menuTitle" href="#"><b>HIPERTENSIÓN ARTERIAL</b> Diálogo con los expertos</Navbar.Brand>
                            </Col>
                            <Col className="toggleHeader" sm={3} xs={3}><Navbar.Toggle aria-controls="navBarHeader" /></Col>
                        </Row>
                    
                    
                    <Navbar.Collapse id="navBarHeader" className="justify-content-end">
                        <Nav
                            activeKey="/home"
                            >
                            <Nav.Item>
                                <Link href="/home" >
                                    <a className={`navLink ${activeNav === "Home" ? 'active' : ''}`}>Inicio</a>
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link href="/modulos" >
                                    <a className={`navLink ${activeNav === "Modulos" ? 'active' : ''}`}>Módulos</a>
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link href="/experts" >
                                    <a className={`navLink ${activeNav === "Experts" ? 'active' : ''}`}>Expertos GREHTA</a>
                                </Link>
                            </Nav.Item>
                            
                            {!isLogged &&(
                                <Nav.Item>
                                    <Link href="/register">
                                        <a className={`navLink ${activeNav === "Register" ? 'active' : ''}`}>Registro</a>
                                    </Link>
                                </Nav.Item>
                            )}
                            {!isLogged &&(
                                <Nav.Item>
                                    <Link href="/login" >
                                        <a className={`navLink ${activeNav === "Login" ? 'active' : ''}`}>Inicio de sesión</a>
                                    </Link>
                                </Nav.Item>
                            )}
                            {isLogged &&(
                                <Nav.Item>
                                    <a onClick={() => logout()} className={`navLink`}>Cerrar sesión</a>
                                </Nav.Item>
                            )}
                            
                            <Nav.Item>
                                <Link href="/contact">
                                    <a className={`navLink ${activeNav === "Contact" ? 'active' : ''}`}>Cont&aacute;ctenos</a>
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
        </Container>
        <Container>
            <Row style={{paddingTop: '15px'}}>
                {children}
            </Row>
        </Container>
        </>
    )
}
export default TemplateHeader;
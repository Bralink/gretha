import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Link from 'next/link'
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GlobalContext} from "../context/GlobalContext";
import useStorage from "../helpers/useStorage/useStorage";

export const TemplateHeader = ({children} : any) => {
    const [activeNav, setActiveNav] = React.useState("Home");
    let {getGlobalState} = useContext(GlobalContext);
    const router = useRouter();

    const setNav = (nav: string) => {
            switch (nav) {
                case "/home":
                    setActiveNav("Home")
                    break;
                case "/topics":
                    setActiveNav("Topics")
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
            }

    }

    const logout = () => {
        let {removeItem} = useStorage();
        removeItem("globalState");
        router.push("/login");
    }
    
    useEffect(() => {
        setNav(router.pathname);
    }, [router.pathname]);

    const isAuthenticated = () => {
        let result = false;

        if(getGlobalState().username !== "" && getGlobalState().username !== undefined){
            result = true;
        }

        return result;
    }

   
    return(
        <Container fluid style={{paddingBottom: '10px'}}>
            <Head>
                <title>{activeNav}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://www.google.com/recaptcha/api.js?render=427774520382-bl6tbbai6umlp4s44qp81bt3f1n9hav7.apps.googleusercontent.com"></script>
            </Head>
        
            <Row style={{height: '40px', backgroundColor: '#ef7953'}}>
                
            </Row>
            <Row style={{backgroundColor: 'white'}}>
                <Col md={12}  className="logo" style={{paddingTop: '5px', paddingBottom: '5px'}}>
                    <Image src={"/logo.png"} width={160} height={45} style={{padding: '10px'}} alt="logo"/>
                </Col>
            </Row>
            <Row style={{backgroundColor: '#e63a52'}}>
                <Navbar expand="lg">
                    <Container>
                    <Navbar.Toggle aria-controls="navBarHeader" />
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
                                <Link href="/topics" >
                                    <a className={`navLink ${activeNav === "Topics" ? 'active' : ''}`}>Tópicos</a>
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link href="/experts" >
                                    <a className={`navLink ${activeNav === "Experts" ? 'active' : ''}`}>Expertos GRETHA</a>
                                </Link>
                            </Nav.Item>
                            {isAuthenticated() &&(
                                <Nav.Item>
                                    <Link href="/topics" >
                                        <a className={`navLink`}>Hola, {getGlobalState().username}</a>
                                    </Link>
                                </Nav.Item>
                            )}
                            {!isAuthenticated() &&(
                                <Nav.Item>
                                    <Link href="/register">
                                        <a className={`navLink ${activeNav === "Register" ? 'active' : ''}`}>Registro</a>
                                    </Link>
                                </Nav.Item>
                            )}
                            {!isAuthenticated() &&(
                                <Nav.Item>
                                    <Link href="/login" >
                                        <a className={`navLink ${activeNav === "Login" ? 'active' : ''}`}>Inicio de Sesión</a>
                                    </Link>
                                </Nav.Item>
                            )}
                            {isAuthenticated() &&(
                                <Nav.Item>
                                    <a onClick={logout} className={`navLink`}>Cerrar Session</a>
                                </Nav.Item>
                            )}
                            
                            <Nav.Item>
                                <Link href="/contact">
                                    <a className={`navLink ${activeNav === "Contact" ? 'active' : ''}`}>Contacto</a>
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
            <Row style={{paddingTop: '20px'}}>
                {children}
            </Row>
        </Container>
    )
}
export default TemplateHeader;
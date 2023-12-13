import './header.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from "reactstrap";
import { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../store/auth-context';
import useHttp from '../http/use-http';
import { motion } from 'framer-motion';

const Header = () => {
    const ctx = useContext(AuthContext);

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState('')

    const httpData = useHttp({url: 'https://localhost:3000/'+ modalContent});
    const { token, error, fetchAuth } = httpData;

    // function to close or open modal
    const modalHandler = () => {
        setModal(!modal)
    }

    // functions to indetify log in or sign up
    const signupModalContentHandler = () => {
        setModalContent('signup')
        modalHandler()
    }
    const loginModalContentHandler = () => {
        setModalContent('login')
        modalHandler()
    }

    // function for form submit
    const formHandler = (event) => {
        event.preventDefault();
        localStorage.setItem("Current User", usernameRef.current.value)
        fetchAuth({email: usernameRef.current.value, password: passwordRef.current.value})
    }

    //useEffect to close modal once user has logged in or Signed up
    useEffect(() => {
        if (parseInt(new Date().getTime() - localStorage.getItem("Loggin date")) < 360000) {
            console.log("Should still logged in")
            ctx.onLogin(localStorage.getItem("Token"), localStorage.getItem("Current User"))
        } else {
            ctx.onLogout()
        }

        if (token) {
            ctx.onLogin(token, usernameRef.current.value)
            localStorage.setItem("Loggin date", new Date().getTime())
            modalHandler()
        }
    }, [token])

    return (
        <header className='header'>
            <motion.div initial={{ x: -150, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ ease: "easeOut", duration: 1.5 }} className='header__name'>
                Hotel Reviewer
            </motion.div>
            <div className='header__login'>
            { ctx.isLoggedIn ? <div className='header__welcome'>Welcome</div> : (<>
                <motion.button whileHover={{scale: 1.1, boxShadow: "2px 7px 24px 0px rgba(0,0,0,0.75)"}} className='header__login-btn header__btn' onClick={loginModalContentHandler}>LogIn</motion.button>
                <motion.button whileHover={{scale: 1.1, boxShadow: "2px 7px 24px 0px rgba(0,0,0,0.75)"}} className='header__btn' onClick={signupModalContentHandler}>Signup</motion.button>
            </>
            )}
            </div>
            <Modal isOpen={modal} toggle={modalHandler} modalTransition={{ timeout: 300 }}>
                <ModalHeader>
                    { modalContent === 'login' ? <div>Log In</div> : <div>Sign Up</div> }
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={formHandler}>
                        <div className='header__login-form'>
                            <label className='header__label'>Username</label>
                            <input type='text' ref={usernameRef}/>
                        </div>
                        <div className='header__login-form'>
                            <label className='header__label'>Password</label>
                            <input type='password' ref={passwordRef}/>
                        </div>
                        <div className='header__login-form'>
                            {modalContent === 'login' ? <Button>Log In</Button> : <Button>Sign Up</Button>}
                            {error ? <p>There has been an error</p> : null}
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={modalHandler}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </header>
    )
}

export default Header;
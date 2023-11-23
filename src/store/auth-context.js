import React, { useState } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    token: '',
    data: '',
    user: '',
    onLogin: () => {},
    onLogout: () => {},
    onGetData: () => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');
    const [data, setData] = useState();

    const loginHandler = (recivedToken, recivedUser) => {
        setIsLoggedIn(true)
        setUser(recivedUser)
        setToken(recivedToken)
    }

    const logoutHandler = () => {
        setIsLoggedIn(false)
        setUser(null)
        setToken(null)
        localStorage.removeItem("Token");
        localStorage.removeItem("Current User");
    }

    const dataHandler = (recivedData) => {
        setData(recivedData)
    }

    return (
        <AuthContext.Provider 
            value={{isLoggedIn: isLoggedIn, user: user, token: token, data: data, onLogin: loginHandler, onLogout: logoutHandler, onGetData: dataHandler}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
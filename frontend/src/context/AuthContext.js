import { createContext, useEffect, useState } from "react";
import { getAuthenticatedService } from "../services";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [lang, setLang] = useState('en');
    const [auth, setAuth] = useState(false);
    const [otpArray, setOtpArray] = useState(['', '', '', '','', '']);
    const [inCompletedOtpVerification, setInCompletedOtpVerification] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [authFormData, setAuthFormData] = useState({
        name: "",
        email: "",
        password: "",
  });

  const getAuthState = async () => {
    const response = await getAuthenticatedService();
    if(response.success) {
        console.log(response)
        alert("User alerady loggedin")
        setAuth(response.userData)
    };
  }

//   useEffect(()=> {
//     getAuthState();
//   }, [])



    const value = {
        lang,
        setLang,
        authFormData,
        setAuthFormData,
        otpArray,
        setOtpArray,
        inCompletedOtpVerification, 
        setInCompletedOtpVerification,
        loading,
        setLoading,
        showPassword,
        setShowPassword,
        auth,
        setAuth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

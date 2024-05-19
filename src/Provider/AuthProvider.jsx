import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState()


    // create user 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login user
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout user
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }


    
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("current user", currentUser);
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unSubscribe()
        }
    }, [])


    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logout,
        

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
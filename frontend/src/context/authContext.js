import { createContext, useContext, useEffect, useState} from "react";
import {createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    onAuthStateChanged,
} from 'firebase/auth'
import { getDatabase, ref, set, get, child } from "firebase/database";
import {auth} from '../firebase-config'

export const authContext = createContext()

export const useAuth = () =>{
    const context = useContext(authContext)
    return context
}

export function AuthProvider({children}){
    
 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    
    function signup (email, password) {
        const userCredentials = createUserWithEmailAndPassword(auth, email, password);
        return userCredentials
    }
    const login = async (email, password) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        await obtainUserData(userCredentials.user.uid)
        console.log("recién termino se subir el localstorage")
        
    }

    const db = getDatabase();

    function signupadd(uid, id_ethereum, nombre, apellido, facultad, token_ethereum){
        set(ref(db, 'users/' + uid), {
            id_ethereum: id_ethereum,
            nombre: nombre,
            apellido: apellido,
            facultad : facultad,
            token_ethereum: token_ethereum
        })
        .then(()=>{
            alert("Usuario Registrado con éxito");
        })
        .catch((error)=>{
            alert("error", error.message)
        });
    }

    function obtainUserData(uid){
        const dbref = ref(db);
        get(child(dbref, 'users/'+uid)).then((snapshot)=>{
            if(snapshot.exists()){
                setUserData({
                    nombre: snapshot.val().nombre,
                    apellido: snapshot.val().apellido,
                    facultad: snapshot.val().facultad,
                    id_ethereum: snapshot.val().id_ethereum,
                    token_ethereum: snapshot.val().token_ethereum,
                })
                localStorage.setItem("nombre", snapshot.val().nombre)
                localStorage.setItem("apellido", snapshot.val().apellido)
                localStorage.setItem("facultad", snapshot.val().facultad)
                localStorage.setItem("id_ethereum", snapshot.val().id_ethereum)
                localStorage.setItem("token_ethereum", snapshot.val().token_ethereum)
                return("Se obtuvo el usuario") 
            }else{
                return("Usuario no encontrado")
            }
        }).catch((error) => {
            alert("error"+error)
        });
    }

    useEffect (() => {
        onAuthStateChanged(auth, CurrentUser =>{
            setUser(CurrentUser);
            try{
                obtainUserData(CurrentUser.uid)
            }catch{
                console.log("falta loguear")
            }
            
            setLoading(false);
        })
    }, [])

    const logout = () => {
        signOut(auth)
        localStorage.removeItem("nombre")
        localStorage.removeItem("apellido")
        localStorage.removeItem("facultad")
        localStorage.removeItem("id_ethereum")
        localStorage.removeItem("token_ethereum")
    };

    const resetPassword = async (email) => sendPasswordResetEmail(auth, email);

    return (
        <authContext.Provider value={{signup, login, logout, resetPassword, user, loading, signupadd, userData}}>
            {children}
        </authContext.Provider>
    )
}
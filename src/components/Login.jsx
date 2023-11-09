import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [name , setName] = useState("masiha")
    const [email , setEmail] = useState("masih@gmail.com");
    const [password , setPassword] = useState("12345");
    const {user , login , isAthenticated} = useAuth();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(name , email , password) login({name , email , password});
    }
    

    useEffect(() => {
        if(isAthenticated) navigate("/")
    } , [isAthenticated , navigate])



    return (
        <div className="w-96 p-4 bg-slate-100 ring ring-violet-600 mt-20  mx-auto rounded-md">
            <h1 className="font-bold text-xl mb-5">Login</h1>
            <form onSubmit={submitHandler} className="flex flex-col">
                <label htmlFor="name" className="mb-2">name :</label>
                <input 
                type="text"
                 id="name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 placeholder="name..."
                 className="px-3 py-2 rounded-md mb-5 ring ring-violet-600"/>

                <label htmlFor="email" className="mb-2">email :</label>
                <input 
                type="email"
                 id="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="email..."
                 className="px-3 py-2 rounded-md mb-5 ring ring-violet-600"/>
                <label htmlFor="password" className="mb-2">password :</label>
                <input 
                type="text" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password..."
                className="px-3 py-2 rounded-md mb-5 ring ring-violet-600"/>
               <button className="w-full rounded-md bg-violet-600 p-2 text-white">Login</button>
            </form>
        </div>
    );
}
 
export default Login;
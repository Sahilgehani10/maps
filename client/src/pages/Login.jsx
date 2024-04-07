import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login(){
    const [email,SetEmail]=useState('');
    const [password,SetPassword]=useState('');
    const [redirect,SetRedirect]=useState(false)
    const{setUser}=useContext(UserContext)
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data}=await axios.post('http://localhost:4000/login',{email,password})
            setUser(data)
            alert('login succesful')
            SetRedirect(true);
        }
        catch(e){
            alert(e)                            
        }
        

    }
    if(redirect)
        {
            return<Navigate to={'/maps'} />
        }
    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="your@email.com" value={email} onChange={ev=>SetEmail(ev.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={ev=>SetPassword(ev.target.value)}/>
                <button className="primary ">Login</button>
                <div className="text-center py-2">
                    dont have an account yet?<Link to={"/signup"} className="text-primary underline">Register Now</Link>
                </div>
            </form>
            </div>
        </div>
    );
}
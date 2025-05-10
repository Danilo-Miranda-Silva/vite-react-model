// Criando a Pagina de Login - Formulario

import { useState } from "react";
import { FaUser,FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/axios";
import logo from '../../../assets/logo_pedrao_vazado.png';
import "./login.css";


export function Login() {
        
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSumit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        
        const resp = await api.post('/login',{
            email: username,
            password: password
        });  
        console.log('Resposta da API:', resp.data); // 👈 Verifique aqui
        if(resp.data.user.success === true){
            localStorage.setItem('isLoggedIn', resp.data.user.success);
            localStorage.setItem('userName', resp.data.user.user.name);
            window.location.href = '/home';
        } else {
            navigate('*');
        }
    }

    return (
         
        <div className="container">
             <img src={logo} alt="Logo" className="logo" /> 
            <form onSubmit={handleSumit}>
                <h1>Acesse o sistema</h1>
                <div className="input-field">
                    <input type="email" placeholder="E-mail" onChange={(e) => setUsername(e.target.value)} />
                    <FaUser className="icon" />
                </div>

                <div className='input-field'>
                    <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                        <FaLock className="icon" />
                </div>
                <button>Entrar</button>
                <div className='error'></div>
            </form>
        </div>
    );   
}
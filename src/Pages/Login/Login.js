import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Styles from './Login.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { auth } from '../../Database/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)

    const navigate = useNavigate()

    async function handleLogin() {
        if (email !== '' || password !== '') {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    toast.success('Seja bem vindo...', { style: { fontSize: '2em' } });
                    navigate('/home', { replace: true })
                    setEmail('')
                    setPassword('')
                })
                .catch(() => {
                    toast.warn('Ocorreu um erro...', { style: { fontSize: '2em' } });
                })
        } else {
            toast.warn('Está faltando algo...', { style: { fontSize: '2em' }});
        }
    }

    return (
        <div className={Styles.loginContainer}>
            <h2>Vamos atualizar o seu <strong>PORTFÓLIO</strong>?</h2>
            <div className={Styles.loginInputs}>
                <label>Email: </label>
                <div>
                    <input
                        type="text"
                        value={email}
                        placeholder="Digite o seu email"
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <span>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                </div>
            </div>

            <div className={Styles.loginInputs}>
                <label>Senha: </label>
                <div>
                    <input
                        type={showPassword ? 'password' : 'text'}
                        value={password}
                        placeholder="Digite a sua senha"
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <span
                        className={Styles.loginEyePassword}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ?
                            <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </span>
                </div>
            </div>

            {<button
                className={`${Styles.loginButton} ${email && password && Styles.colorSecondary}`}
                onClick={() => handleLogin()}
            >Login</button>}
        </div>
    )
}
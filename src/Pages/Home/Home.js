import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import './Home.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faEye, faFileCirclePlus, faFile } from "@fortawesome/free-solid-svg-icons";

import { auth, db } from '../../Database/firebaseConnection'
import { signOut } from 'firebase/auth'
import { getDoc, doc } from "firebase/firestore";

import ButtonPrimary from "../../Components/ButtonPrimary/ButtonPrimary";
import Menu from "../../Components/Menu/Menu";

export default function Home() {
    const [user, setUser] = useState({
        name: '',
        image: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
    })

    async function getUserDetails() {
        await getDoc(doc(db, "user", '0'))
            .then((user) => {
                setUser(user.data())
            })
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    const navigate = useNavigate()

    async function handleLogOut() {
        await signOut(auth)
        navigate("/")
        toast.success('LogOut realizado com sucesso!', { style: { fontSize: '2em' } });
    }

    return (
        <div className="homeContainer">
            <nav className="homeNav">
                <div className="user">
                    <img src={ user.image } alt="Imagem do usuário" />
                    <strong>{ user.name }</strong>

                    <ButtonPrimary
                        onClick={() => handleLogOut()}
                        title="LogOut"
                        width="50%"
                    />
                </div>
                <div className="optionsHome">
                    <Menu
                        onClick={() => navigate('/projects')}
                        title="Visualizar projetos"
                        icon={<FontAwesomeIcon icon={faEye} />} />

                    <Menu
                        onClick={() => navigate('/main')}
                        title="Adicionar projetos"
                        icon={<FontAwesomeIcon icon={faFileCirclePlus} />} />

                    <Menu
                        title="Atualizar curriculo"
                        icon={<FontAwesomeIcon icon={faArrowsRotate} />} />

                    <Menu
                        title="Editar biografia"
                        icon={<FontAwesomeIcon icon={faFile} />} />
                </div>
            </nav>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Styles from './Home.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faEye, faFileCirclePlus, faFile } from "@fortawesome/free-solid-svg-icons";

import { auth, db } from '../../Database/firebaseConnection'
import { signOut } from 'firebase/auth'
import { getDoc, doc } from "firebase/firestore";

import ButtonPrimary from "../../Components/ButtonPrimary/ButtonPrimary";
import Menu from "../../Components/Menu/Menu";

export default function Home() {
    const [imageUser, setImageUse] = useState('https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png')

    async function getUserDetails() {
        await getDoc(doc(db, "user", '0'))
        .then((user) => {
            setImageUse(user.data().image)
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
        <div className={Styles.homeContainer}>
            <nav>
                <div className={Styles.user}>
                    <img src={imageUser} alt="oi" />
                    <strong>Ivamberg Silva</strong>

                    <ButtonPrimary
                        onClick={() => handleLogOut()}
                        title="LogOut"
                    />
                </div>
                <div className={Styles.optionsHome}>
                    <Menu
                        onClick={() => navigate('/list')}
                        title="Visualizar projetos"
                        icon={<FontAwesomeIcon icon={faEye} />}/>

                    <Menu
                        onClick={() => navigate('/main')}
                        title="Adicionar projetos"
                        icon={<FontAwesomeIcon icon={faFileCirclePlus} />}/>

                    <Menu
                        title="Atualizar curriculo"
                        icon={<FontAwesomeIcon icon={faArrowsRotate} />}/>

                    <Menu
                        title="Editar biografia"
                        icon={<FontAwesomeIcon icon={faFile} />}/>
                </div>
            </nav>
        </div>
    )
}
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faLink } from "@fortawesome/free-solid-svg-icons";

import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../Database/firebaseConnection";

import Close from "../../Components/CloseButton/Close";
import ButtonPrimary from "../../Components/ButtonPrimary/ButtonPrimary";

import { AmountProjectContext } from "../../Context/Context";

import './ListProjects.scss'

export default function ListProjects() {

    const navigate = useNavigate()
    const [projects, setProjects] = useState([])

    async function getProjects() {
        const projectsRef = collection(db, "projects")

        await getDocs(projectsRef)
            .then((snapshot) => {
                let projectList = []
                snapshot.forEach((project) => {
                    projectList.push({
                        id: project.id,
                        ...project.data()
                    })
                })
                setProjects(projectList)
            })
            .catch((error) => {
                toast.warn('Verifique o console, pois ocorreu um erro!', { style: { fontSize: '2em' } });
                console.log(`Error: ${error}`)
            })
    }

    const { amountProject, setAmountProject } = useContext(AmountProjectContext)

    async function deleteProject(id) {
        const projectRef = doc(db, "projects", id)
        await deleteDoc(projectRef)
            .then(() => {
                toast.success('Projeto excluído do banco!', {
                    style: { fontSize: '2em' },
                });
                setProjects(projects)
                getProjects()
            })
            .catch((error) => {
                toast.warn('Verifique o console, pois ocorreu um erro!', {
                    style: {
                        fontSize: '2em',
                    },
                    autoClose: 1000,
                });
                console.log(`Error: ${error}`)
            })
        setAmountProject()
    }

    useEffect(() => {
        getProjects()
    }, [getProjects])

    return (
        <div className="listProjectsContainer">

            <Close />

            <h2>Você já possui {amountProject} { amountProject === 1 ? 'projeto' : 'projetos'} em seu banco de dados!</h2>

            <ButtonPrimary
                title="Adicionar projeto"
                width="50%"
                onClick={() => navigate('/main')}
            />

            <div className="listProjectHead">
                <span>ID</span>
                <span>Título</span>
                <span>Descrição</span>
                <span>Repositório</span>
                <span>Ações</span>
            </div>

            {projects && projects.map((project) => {
                return (
                    <div
                        className="listProjectBody"
                        key={project.id}
                    >
                        <span>{project.id}</span>
                        <span>{project.title}</span>
                        <span>{project.description}</span>
                        <a href={project.link_repository} target="_blank" rel="noreferrer" ><FontAwesomeIcon icon={faLink} /></a>
                        <span>
                            <button
                                onClick={() => navigate(`/update/${project.id}`)}><FontAwesomeIcon icon={faPen}
                                /></button>
                            <button
                                onClick={() => deleteProject(project.id)}><FontAwesomeIcon icon={faTrash}
                                /></button>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
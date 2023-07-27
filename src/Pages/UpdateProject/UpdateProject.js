import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Database/firebaseConnection";

import Close from "../../Components/CloseButton/Close";
import ButtonPrimary from "../../Components/ButtonPrimary/ButtonPrimary";
import InputField from "../../Components/InputField/InputField";

import './UpdateProject.scss'

export default function UpdateProject() {

    const bgColorBtn = getComputedStyle(document.documentElement).getPropertyValue('--color-check');
    const bgColorBtnDisable = getComputedStyle(document.documentElement).getPropertyValue('--color-check-light');

    const [project, setProject] = useState({
        id: '',
        title: '',
        description: '',
        link_repository: '',
        link_deploy: '',
        image: '',
        languages: [],
        observation: ''
    })

    const { id } = useParams()

    async function getProject() {
        await getDoc(doc(db, "projects", id))
            .then((snapshot) => {
                if (snapshot.data() !== undefined) {
                    toast.success('Projeto obtido com sucesso!', { style: { fontSize: '2em' } });

                    setProject(snapshot.data())
                    setLanguages(snapshot.data().languages)
                } else {
                    toast.warn('Falha ao obter o projeto!', { style: { fontSize: '2em' } });
                }
            })
            .catch((error) => {
                toast.warn('Verifique o console, pois ocorreu um erro!', { style: { fontSize: '2em' } });
                console.log(`Error: ${error}`)
            })
    }

    useEffect(() => {
        getProject()
        // eslint-disable-next-line
    }, [])

    const [languages, setLanguages] = useState([])

    const [inputLanguages, setInputLanguages] = useState('')

    function deleteLanguage(index) {
        languages.splice(index, 1)
        setLanguages(languages)
        setProject({ ...project, languages: languages })
    }

    const addLanguages = useCallback(() => {
        setLanguages([...languages, inputLanguages])

        setProject({ ...project, languages: [...languages, inputLanguages] })

        setInputLanguages('')

    }, [project, languages, inputLanguages])

    function updateProject() {
        if (project.id && project.title && project.description && project.image && project.link_deploy && project.link_repository && project.languages.length > 0) {
            putProject()
        }
    }

    async function putProject() {
        await updateDoc(doc(db, "projects", id), {
            ...project
        })
            .then(() => {
                toast.success('Projeto atualizado com sucesso!', { style: { fontSize: '2em' } });
            })
            .catch((error) => {
                toast.warn('Verifique o console, pois ocorreu um erro!', { style: { fontSize: '2em' } });
                console.log(`Error: ${error}`)
            })
    }

    return (
        <div className="updateProjectContainer">
            <Close />

            <h1>{project.title}</h1>

            <InputField
                label="ID:"
                placeholder="Digite o ID do projeto"
                value={project.id}
                onChange={(e) => setProject({ ...project, id: e.target.value })} />

            <InputField
                label="Título do projeto:"
                placeholder="Digite o título do projeto"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })} />

            <InputField
                type="textarea"
                label="Descrição do projeto:"
                placeholder="Digite a descrição do projeto"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })} />

            <InputField
                label="Link do repositório:"
                placeholder="Digite o link do repositório"
                value={project.link_repository}
                onChange={(e) => setProject({ ...project, link_repository: e.target.value })} />

            <InputField
                label="Link do deploy:"
                placeholder="Digite o link do deploy"
                value={project.link_deploy}
                onChange={(e) => setProject({ ...project, link_deploy: e.target.value })} />

            <InputField
                label="Imagem:"
                placeholder="Digite o url da imagem"
                value={project.image}
                onChange={(e) => setProject({ ...project, image: e.target.value })} />

            <InputField
                label="Linguagens:"
                placeholder="Digite uma linguagem"
                value={inputLanguages}
                onChange={(e) => setInputLanguages(e.target.value)} />

            <ButtonPrimary
                onClick={addLanguages}
                title="Adicionar linguagem"
                bgColor={bgColorBtn}
                bgColorDisable={bgColorBtnDisable}
                enable={inputLanguages}
            />

            {languages.length > 0 ?
                <div className="addedLanguages">
                    <label>Linguagens: </label>
                    <ul>
                        {project.languages && project.languages.map((item, index) =>
                            <li className="languages" key={index}>
                                <h1>{item}</h1>
                                <button onClick={() => deleteLanguage(index)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </li>)
                        }
                    </ul>
                </div> : ""
            }

            <InputField
                label="Observação (opcional):"
                placeholder="Digite alguma observação"
                value={project.observation}
                onChange={(e) => setProject({ ...project, observation: e.target.value })} />

            <ButtonPrimary
                onClick={() => updateProject()}
                title="Atualizar projeto"
                bgColor={bgColorBtn}
                enable="true"
            />
        </div >
    )
}
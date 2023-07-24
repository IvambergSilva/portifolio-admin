import React from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import Styles from './CloseButton.module.scss'

export default function Close() {
    const navigate = useNavigate()

    return (
        <span
            className={Styles.iconClose}
            onClick={() => navigate('/home')}
        ><FontAwesomeIcon icon={faClose} /></span>
    )
}
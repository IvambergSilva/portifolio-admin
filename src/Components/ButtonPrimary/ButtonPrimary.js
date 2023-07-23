import React from "react";
import Styles from './ButtonPrimary.module.scss'

export default function ButtonPrimary(props) {
    return (
        <button onClick={props.onClick}
            className={`${Styles.loginButton} ${Styles.colorSecondary}`}
        >{props.title}</button>
    )
}
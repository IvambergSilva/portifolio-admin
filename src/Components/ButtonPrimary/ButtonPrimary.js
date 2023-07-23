import React from "react";
import Styles from './ButtonPrimary.module.scss'

export default function ButtonPrimary(props) {
    return (
        <button onClick={props.onClick}
            className={`${Styles.loginButton} ${Styles.colorSecondary}`}
            style={props.enable ? { backgroundColor: props.bgColor } : { backgroundColor: props.bgColorDisable}}
        >{props.title}</button>
    )
}
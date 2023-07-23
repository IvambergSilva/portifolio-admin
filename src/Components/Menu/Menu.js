import React from "react";
import Styles from './Menu.module.scss'

export default function Menu(props) {
    return (
        <div
            className={Styles.menuContainer}
            onClick={props.onClick}
        >
            <span>{props.icon}</span>
            <span>{props.title}</span>
        </div>
    )
}
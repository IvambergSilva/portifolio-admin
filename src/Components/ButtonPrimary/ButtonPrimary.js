import React from "react";
import Styles from './ButtonPrimary.module.scss'

export default function ButtonPrimary(props) {
    const commonStyle = {}
    
    if(props.width) commonStyle.width = props.width

    const dynamicStyle = props.enable 
    ? {...commonStyle, backgroundColor: props.bgColor } 
    : {...commonStyle, backgroundColor: props.bgColorDisable}

    return (
        <button onClick={props.onClick}
            className={`${Styles.loginButton} ${Styles.colorSecondary}`}
            style={dynamicStyle}
        >{props.title}</button>
    )
}
import React from "react";

import Styles from './InputField.module.scss'

export default function InputField(props) {
    return (
        <div className={Styles.inputContainer}>
            <label>{props.label}</label>
            {props.type === 'textarea' ? (
                <textarea
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                ></textarea>
            ) : (
                <input
                    type="text"
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                ></input>
            )}
        </div>
    )
}
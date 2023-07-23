import React from "react";
import RoutesApp from "./Routes/Routes";
import './Styles/styles.scss'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

export default function App() {
    return (
        <div>
            <ToastContainer autoClose={2000}/>
            <RoutesApp />
        </div>
    )
}
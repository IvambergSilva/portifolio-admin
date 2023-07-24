import React from "react";
import RoutesApp from "./Routes/Routes";
import './Styles/styles.scss'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { AmountProjectProvider } from "./Context/Context";

export default function App() {
    return (
        <div>
            <AmountProjectProvider>
                <ToastContainer autoClose={1000} />
                <RoutesApp />
            </AmountProjectProvider>
        </div>
    )
}
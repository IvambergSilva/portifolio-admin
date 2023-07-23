import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../Pages/Login/Login'
import Home from '../Pages/Home/Home'

import Private from '../Private/Private'

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/home" element={
                    <Private>
                        <Home />
                    </Private>
                }></Route>
            </Routes>
        </BrowserRouter>
    )
} 
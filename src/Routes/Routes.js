import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../Pages/Login/Login'
import Home from '../Pages/Home/Home'
import ListProjects from '../Pages/ListProjects/ListProjects'

import NewProject from '../Pages/NewProject/NewProject'

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
                <Route path="/main" element={
                    <Private>
                        <NewProject />
                    </Private>
                }></Route>
                <Route path="/projects" element={
                    <Private>
                        <ListProjects />
                    </Private>
                }></Route>
            </Routes>
        </BrowserRouter>
    )
} 
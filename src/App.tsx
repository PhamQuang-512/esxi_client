import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserContext from './context/UserContext';
import CreateVM from './pages/CreateVM';
import Home from './pages/Home';
import Login from './pages/Login';
import Error from './pages/Error';
import Layout from './pages/Layout';
import VM from './pages/VM';

function App() {
    return (
        <UserContext>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='create-vm' element={<CreateVM />} />
                    <Route path='vm/:name' element={<VM />} />
                </Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </UserContext>
    );
}

export default App;

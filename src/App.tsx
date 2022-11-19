import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Loading from './components/Loading';
import UserContext from './context/UserContext';

const CreateVM = React.lazy(() => import('./pages/CreateVM'));
const VM = React.lazy(() => import('./pages/VM'));
const Login = React.lazy(() => import('./pages/Login'));
const Error = React.lazy(() => import('./pages/Error'));
const Layout = React.lazy(() => import('./pages/Layout'));
const VMDetails = React.lazy(() => import('./pages/VMDetails'));

function App() {
    return (
        <UserContext>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Navigate to={'vm'} />} />
                        <Route path='vm' element={<VM />} />
                        <Route path='vm/:name' element={<VMDetails />} />
                        <Route path='create-vm' element={<CreateVM />} />
                    </Route>
                    <Route path='*' element={<Error />} />
                </Routes>
            </Suspense>
        </UserContext>
    );
}

export default App;

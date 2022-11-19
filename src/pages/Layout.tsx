import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Outlet, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { userContext } from '../context/UserContext';

const Container = styled.div`
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 5fr;
`;

const Layout = () => {
    const { user } = useContext(userContext);

    if (!user) return <Navigate to='/login' />;

    return (
        <Container>
            <Navbar />
            <Outlet />
        </Container>
    );
};

export default Layout;

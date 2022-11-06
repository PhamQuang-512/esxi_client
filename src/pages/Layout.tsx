import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 5fr;
`;

const Layout = () => {
    return (
        <Container>
            <Navbar />
            <Outlet />
        </Container>
    );
};

export default Layout;

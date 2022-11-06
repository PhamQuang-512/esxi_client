import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { userContext } from '../context/UserContext';

const Container = styled.div`
    background-color: red;
    height: 100vh;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 100px;
    background-color: var(--main-color);

    div {
        display: flex;
        flex-direction: column;

        a {
            text-decoration: none;
            text-align: center;
            padding: 12px;
            color: white;
            position: relative;

            &.isActive {
                background-color: white;
                color: black;
            }

            /* &.active::before {
                display: block;
            }
    
            &::before {
                display: none;
                content: '';
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                border-right: 10px solid black;
            } */
        }

        button {
            padding: 8px;
            cursor: pointer;
            font-size: 20px;
            background-color: var(--main-color);
            color: white;
            border: none;

            &:hover {
                background-color: white;
                color: black;
            }
        }
    }
`;

const Navbar = () => {
    const { logout } = useContext(userContext);

    return (
        <Container>
            <div>
                <NavLink
                    className={({ isActive }) => (isActive ? 'isActive' : '')}
                    to={'/'}
                    end={true}
                >
                    Home
                </NavLink>
                <NavLink
                    className={({ isActive }) => (isActive ? 'isActive' : '')}
                    to={'/create-vm'}
                >
                    Create VM
                </NavLink>
            </div>
            <div>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </Container>
    );
};

export default Navbar;

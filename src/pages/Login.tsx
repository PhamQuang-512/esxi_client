import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { MdChevronRight } from 'react-icons/md';
import { GrVirtualMachine } from 'react-icons/gr';
import { AiOutlineUser } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate, Navigate } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import api, { isAxiosError } from '../api/axios';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: linear-gradient(45deg, #bbd0ef, #fff);
`;

const FormContainer = styled.div`
    background-color: white;
    width: 1200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    display: grid;
    grid-template-columns: 5fr 2fr;
`;

const FormImg = styled.div`
    background-image: url('images/vm_img.jpg');
    background-repeat: no-repeat;
    background-size: cover;
`;

const Form = styled.form`
    padding: 2rem 1.5rem;

    h1 {
        margin-bottom: 20px;
    }
`;

const FormField = styled.div`
    --height: 56px;
    --font-size: 24px;
    --icon-width: 40px;
    display: flex;
    flex-direction: column;
    margin-bottom: 44px;
    position: relative;

    label {
        height: var(--height);
        line-height: var(--height);
        position: absolute;
        left: 0;
        font-size: var(--font-size);

        svg {
            width: var(--icon-width);
        }
    }

    input {
        height: var(--height);
        padding: 12px 20px;
        padding-left: var(--icon-width);
        outline: none;
        border: none;
        border-bottom: 1px solid black;
        background-color: white;
        font-size: var(--font-size);

        &:focus,
        &:hover,
        &:not(:placeholder-shown) {
            border-color: var(--main-color);
        }

        &:placeholder-shown {
            border-color: #cbcbcb;
        }
    }
`;

const Button = styled.button`
    width: 100%;
    height: 60px;
    outline: none;
    background-color: var(--main-color);
    font-size: 24px;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 30px;
    padding-left: 40px;
    padding-right: 40px;

    &:hover {
        cursor: pointer;
    }
`;

const Login = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errMessage, setErrMessage] = useState<string>('');
    const navigate = useNavigate();
    const { user, login } = useContext(userContext);

    if (user) return <Navigate to={'/'} />;

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const response = await api.post('/authen/sign_in', {
                username: userName,
                password: password,
            });
            console.log(response.data);

            login(response.data.username, response.data.accessToken);
            navigate('/');
        } catch (error) {
            if (isAxiosError(error)) {
                setErrMessage(error.response?.data.message);
            } else {
                setErrMessage('Unknow error!!!');
            }
            console.log(error);
        }
    };

    return (
        <Container>
            <FormContainer>
                <FormImg>.</FormImg>
                <Form onSubmit={onFormSubmit}>
                    <div style={{ textAlign: 'center' }}>
                        <GrVirtualMachine size={40} />
                    </div>
                    <h1>Login</h1>
                    <FormField>
                        <input
                            id='username'
                            type='text'
                            value={userName}
                            placeholder='Username'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setUserName(e.target.value)
                            }
                        />
                        <label htmlFor='username'>
                            <AiOutlineUser />
                        </label>
                    </FormField>

                    <FormField>
                        <input
                            id='password'
                            type='password'
                            value={password}
                            placeholder='Password'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)
                            }
                        />
                        <label htmlFor='password'>
                            <RiLockPasswordLine />
                        </label>
                    </FormField>

                    <p style={{ color: 'red', marginBottom: '8px' }}>{errMessage}</p>

                    <Button type='submit'>
                        <div>Login now</div>
                        <MdChevronRight />
                    </Button>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default Login;

import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userContext } from '../context/UserContext';

const Container = styled.div`
    position: relative;
`;

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Form = styled.form`
    padding: 20px;
    width: 80%;

    div {
        display: flex;
        flex-direction: column;
        margin: 12px 0;
        font-size: 20px;

        input,
        select {
            height: 40px;
            padding: 0 12px;
            outline: none;
            border: 1px solid #cbcbcb;
            font-size: inherit;
        }
    }
`;

const Button = styled.button`
    float: right;
    background: var(--main-color);
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border: none;

    &:disabled {
        background-color: #ccc;
    }
`;

const CreateVM = () => {
    const [name, setName] = useState<string>('');
    const [os, setOs] = useState<string>('');
    const [cpu, setCpu] = useState<number>(0);
    const [ram, setRam] = useState<number>(0);
    const [storage, setStorage] = useState<number>(0);
    const [creating, setCreating] = useState<boolean>(false);
    const navigate = useNavigate();
    const { user } = useContext(userContext);

    if (!user) return <Navigate to='/login' />;

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setCreating(true);

            console.log(name, os, cpu, ram, storage);
            // navigate(`/vm/${name}`);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => setCreating(false), 3000);
        }
    };

    return (
        <Container>
            <FormContainer>
                <Form className='form' action='./create-vm' onSubmit={onFormSubmit}>
                    <h1>Create a virtual machine:</h1>

                    <div>
                        <label htmlFor='name'>Name: </label>
                        <input
                            id='name'
                            type='text'
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setName(e.target.value.trim())
                            }
                            required
                            disabled={creating}
                        />
                    </div>

                    <div>
                        <label htmlFor='os'>Operating System: </label>
                        <select
                            name='os'
                            id='os'
                            required
                            value={os}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setOs(e.target.value)
                            }
                            disabled={creating}
                        >
                            <option value=''>--Choose an operating system--</option>
                            <option value='Window'>Window</option>
                            <option value='Ubuntu'>Ubuntu</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='vCpu'>vCPU: </label>
                        <select
                            name='vCpu'
                            id='vCpu'
                            required
                            value={cpu}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setCpu(parseInt(e.target.value))
                            }
                            disabled={creating}
                        >
                            <option value=''>--Choose vCPU--</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='4'>4</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='Ram'>Ram: </label>
                        <select
                            name='ram'
                            id='ram'
                            required
                            value={ram}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setRam(parseInt(e.target.value))
                            }
                            disabled={creating}
                        >
                            <option value=''>--Choose Ram--</option>
                            <option value='2'>2GB</option>
                            <option value='4'>4GB</option>
                            <option value='6'>6GB</option>
                            <option value='8'>8GB</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='storage'>Storage (GB): </label>
                        <input
                            type='number'
                            required
                            min={os === 'Ubuntu' ? 8 : os === 'Window' ? 32 : 0}
                            placeholder={
                                os === 'Ubuntu' ? 'Min: 8GB' : os === 'Window' ? 'Min: 32GB' : ''
                            }
                            value={storage}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setStorage(parseInt(e.target.value))
                            }
                            disabled={creating}
                        />
                    </div>

                    <Button className='btn' type='submit' disabled={creating}>
                        Submit
                    </Button>
                    {creating && 'Creating...'}
                </Form>
            </FormContainer>
        </Container>
    );
};

export default CreateVM;

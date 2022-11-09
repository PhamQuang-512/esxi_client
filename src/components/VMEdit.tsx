import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { isAxiosError } from '../api/axios';

const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const FormContainer = styled.div`
    background-color: white;
    width: 800px;
    height: fit-content;
    border: 2px solid #eee;
    border-radius: 20px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    button {
        cursor: pointer;
        border: none;
        border-radius: 8px;
    }

    .closeBtn {
        float: right;
        padding: 4px;
        width: 40px;
        height: 40px;
        background-color: transparent;
        margin-bottom: 10px;
    }

    form {
        clear: both;
        font-size: 24px;

        div + div {
            margin-top: 20px;
        }

        div {
            display: flex;
            justify-content: space-between;
        }

        div:last-child {
            justify-content: end;
        }

        input,
        select {
            width: 50%;
            padding: 4px 8px;
            font-size: inherit;
        }

        .btnGroup {
            button {
                padding: 8px 16px;
                margin-left: 12px;
                font-size: 16px;
            }

            button[type='submit'] {
                background-color: var(--main-color);
                color: white;
            }
        }
    }
`;

interface Props {
    setVmName: React.Dispatch<string>;
    setOs: React.Dispatch<string>;
    setCpu: React.Dispatch<number>;
    setRam: React.Dispatch<number>;
    setStorage: React.Dispatch<number>;
    minStorage: number;
    close: () => void;
}

const VMEdit = ({ setVmName, setOs, setCpu, setRam, setStorage, minStorage, close }: Props) => {
    const [editName, setEditName] = useState<string>('');
    const [editOs, setEditOs] = useState<string>('');
    const [editCpu, setEditCpu] = useState<number>(0);
    const [editRam, setEditRam] = useState<number>(0);
    const [editStorage, setEditStorage] = useState<number>(minStorage);
    const [errMessage, setErrMessage] = useState<string>('');

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editName) setVmName(editName);
            if (editOs) setOs(editOs);
            if (editCpu) setCpu(editCpu);
            if (editRam) setRam(editRam);
            if (editStorage) setStorage(editStorage);
            close();
        } catch (error) {
            if (isAxiosError(error)) {
                const data = error.response?.data;
                console.log(data);
            }
        }
    };

    return (
        <Container>
            <FormContainer>
                <button type='button' className='closeBtn' onClick={() => close()}>
                    <AiOutlineCloseCircle size={30} />
                </button>
                <h1>Edit</h1>
                <form onSubmit={onFormSubmit}>
                    <div>
                        <label htmlFor='name'>Virtual machine name:</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={editName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEditName(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor='os'>Operating system:</label>
                        <select
                            name='os'
                            id='os'
                            value={editOs}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setEditOs(e.target.value)
                            }
                        >
                            <option value=''>--Choose an operating system--</option>
                            <option value='Window'>Window</option>
                            <option value='Ubuntu'>Ubuntu</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='cpu'>Cpu:</label>
                        <select
                            name='vCpu'
                            id='vCpu'
                            value={editCpu}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setEditCpu(parseInt(e.target.value))
                            }
                        >
                            <option value=''>--Choose vCPU--</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='4'>4</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='ram'>Ram:</label>
                        <select
                            name='ram'
                            id='ram'
                            value={editRam}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setEditRam(parseInt(e.target.value))
                            }
                        >
                            <option value=''>--Choose Ram--</option>
                            <option value='2'>2GB</option>
                            <option value='4'>4GB</option>
                            <option value='6'>6GB</option>
                            <option value='8'>8GB</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor='storage'>Storage (Min: {minStorage}GB):</label>
                        <input
                            type='number'
                            id='storage'
                            name='storage'
                            min={minStorage}
                            value={editStorage}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEditStorage(parseInt(e.target.value))
                            }
                        />
                    </div>

                    <div className='btnGroup'>
                        <button type='button' onClick={() => close()}>
                            Cancel
                        </button>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </FormContainer>
        </Container>
    );
};

export default VMEdit;

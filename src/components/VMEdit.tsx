import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { isAxiosError } from '../api/axios';
import { editVMCPURam, editVMHardDisk } from '../api/vm';
import Loading from './Loading';

const Container = styled.div`
    z-index: 100;
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
    name: string;
    numCPU: number;
    ramGB: number;
    minStorage: number;
    close: () => void;
}

const VMEdit = ({ name, numCPU, ramGB, minStorage, close }: Props) => {
    const [hardDisk, setHardDisk] = useState<number>(minStorage);
    const [cpu_ram, setCpu_ram] = useState({
        numCPU: numCPU,
        ramGB: ramGB,
    });
    const [errMessage, setErrMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (hardDisk !== minStorage) await editVMHardDisk(name, hardDisk);

            if (cpu_ram.numCPU !== numCPU || cpu_ram.ramGB !== ramGB)
                await editVMCPURam(name, cpu_ram.numCPU, cpu_ram.ramGB);

            close();
        } catch (error) {
            if (isAxiosError(error)) {
                setErrMessage(error.response?.data.error);
            } else {
                setErrMessage('Unknow error!!!');
            }
            console.log(error);
        } finally {
            setLoading(false);
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
                        <label htmlFor='cpu'>Cpu:</label>
                        <select
                            name='vCpu'
                            id='vCpu'
                            value={cpu_ram.numCPU}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setCpu_ram({ ...cpu_ram, numCPU: parseInt(e.target.value) })
                            }
                        >
                            <option>--Choose vCPU--</option>
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
                            value={cpu_ram.ramGB}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                setCpu_ram({ ...cpu_ram, ramGB: parseInt(e.target.value) })
                            }
                        >
                            <option>--Choose Ram--</option>
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
                            value={hardDisk}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setHardDisk(parseInt(e.target.value))
                            }
                        />
                    </div>

                    <div>
                        <p style={{ color: 'red' }}>{errMessage}</p>
                    </div>

                    <div className='btnGroup'>
                        <button type='button' onClick={() => close()}>
                            Cancel
                        </button>
                        <button type='submit'>Save</button>
                    </div>
                </form>
            </FormContainer>
            {loading && <Loading />}
        </Container>
    );
};

export default VMEdit;

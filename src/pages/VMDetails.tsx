import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { AiOutlineCopy } from 'react-icons/ai';
import { GrVirtualMachine } from 'react-icons/gr';
import VMEdit from '../components/VMEdit';
import VM from '../model/VM';
import { deleteVM, editVMState, getVM } from '../api/vm';
import { isAxiosError } from '../api/axios';
import Loading from '../components/Loading';

const Container = styled.div`
    margin: 0 12px;

    button {
        cursor: pointer;
    }

    button + button {
        margin-left: 12px;
    }

    .edit-enter {
        opacity: 0;
    }
    .edit-enter-active {
        opacity: 1;
        transition: opacity 300ms;
    }
    .edit-exit {
        opacity: 1;
    }
    .edit-exit-active {
        opacity: 0;
        transition: opacity 300ms;
    }

    .editBtn {
        outline: none;
        padding: 8px 12px;
        background-color: var(--main-color);
        color: white;
        border: none;
    }

    .deleteBtn {
        outline: none;
        padding: 8px 12px;
        background-color: red;
        color: white;
        border: none;
    }
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 2px black solid;

    svg {
        margin-right: 12px;
    }

    .status {
        display: inline-block;
        font-size: 120%;
        color: #66e666;
    }

    .btnGroup {
        button {
            border: none;
            padding: 4px 8px;
            font-size: 16px;
        }

        button + button {
            margin-left: 4px;
        }

        .btnTurnOn {
            /* background-color: #66e666; */
        }

        .btnSuspend {
            /* background-color: yellow; */
        }

        .btnShutdown {
            /* background-color: red; */
        }
    }
`;

const Info = styled.div`
    padding: 12px 0;

    div {
        position: relative;
    }

    p {
        display: inline-block;
        color: #73c6fd;
        font-size: 20px;
    }

    .copyBtn {
        background-color: white;
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const VMDetails = () => {
    const ipRef = useRef<HTMLParagraphElement>(null);
    const { name } = useParams();
    const navigate = useNavigate();
    const [VM, setVM] = useState<VM | null>(null);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const getInfo = React.useCallback(async () => {
        try {
            setLoading(true);
            const data = await getVM(name as string);
            setVM(data);
            console.log(data);
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
    }, [name]);

    const changeVMState = async (state: 'PoweredOn' | 'PoweredOff' | 'Suspended') => {
        try {
            setLoading(true);
            const data = await editVMState(name as string, state);
            setVM({ ...VM, state: state } as VM);

            console.log(data);
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

    const onDeleteVM = async () => {
        try {
            setLoading(true);
            const data = await deleteVM(name as string);

            console.log(data);
            navigate('/vm');
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

    //TODO: axios get vm info, catch error
    useEffect(() => {
        getInfo();

        return () => {};
    }, [getInfo]);

    return (
        <Container>
            <CSSTransition in={showEdit} mountOnEnter unmountOnExit timeout={300} classNames='edit'>
                {(state) => (
                    <div>
                        <div style={{ position: 'relative' }}>
                            <VMEdit
                                name={name as string}
                                numCPU={VM?.numCPU as number}
                                ramGB={VM?.ramGB as number}
                                minStorage={VM?.storage as number}
                                close={() => setShowEdit(false)}
                                vm={VM as VM}
                                setVM={setVM}
                            />
                        </div>
                        {loading && <Loading />}
                    </div>
                )}
            </CSSTransition>
            <Header>
                <h1>
                    <GrVirtualMachine size={30} />

                    {VM?.name}
                </h1>
                <div>
                    <div>
                        Status: <div className='status'>{VM?.state}</div>
                    </div>
                    <div className='btnGroup'>
                        <button className='btnTurnOn' onClick={() => changeVMState('PoweredOn')}>
                            Turn on
                        </button>
                        <button className='btnSuspend' onClick={() => changeVMState('Suspended')}>
                            Suspend
                        </button>
                        <button className='btnShutdown' onClick={() => changeVMState('PoweredOff')}>
                            Shutdown
                        </button>
                    </div>
                </div>
            </Header>
            <Info>
                <div>
                    IPv4:{' '}
                    {VM?.ip && (
                        <>
                            <p ref={ipRef}>{VM.ip}</p>
                            <AiOutlineCopy
                                size={20}
                                className='copyBtn'
                                onClick={() => {
                                    if (ipRef.current !== null) {
                                        console.log(ipRef.current.innerHTML);
                                        navigator.clipboard
                                            .writeText(VM.ip)
                                            .then(() => alert('ip copied'))
                                            .catch(console.log);
                                    }
                                }}
                            />
                        </>
                    )}
                </div>

                <div>
                    Operating system: <p>{VM?.os}</p>
                </div>
                <div>
                    vCPU: <p>{VM?.numCPU}</p>
                </div>
                <div>
                    Ram: <p>{VM?.ramGB}GB</p>
                </div>
                <div>
                    Storage: <p>{VM?.storage}GB</p>
                </div>
                {VM?.os === 'UBUNTU' && (
                    <>
                        <div>
                            Default username: <p>uuser</p>
                        </div>
                        <div>
                            Default password: <p> 123</p>
                        </div>
                    </>
                )}
                {VM?.os === 'WINDOW' && (
                    <>
                        <div>
                            Default username: <p>Administrator</p>
                        </div>
                        <div>
                            Default password: <p> Admin123</p>
                        </div>
                    </>
                )}
            </Info>
            <div style={{ float: 'right' }}>
                <button
                    className='editBtn'
                    onClick={() => {
                        if (VM?.state === 'PoweredOff') {
                            setErrMessage('');
                            setShowEdit(true);
                        } else setErrMessage('Virtual machine is on! Can not edit');
                    }}
                >
                    Edit virtual machine
                </button>

                <button className='deleteBtn' onClick={() => onDeleteVM()}>
                    Delete virtual machine
                </button>
            </div>

            <div>
                <p style={{ color: 'red' }}>{errMessage}</p>
            </div>
        </Container>
    );
};

export default VMDetails;

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { AiOutlineCopy } from 'react-icons/ai';
import { GrVirtualMachine } from 'react-icons/gr';
import VMEdit from '../components/VMEdit';

const Container = styled.div`
    margin: 0 12px;

    button {
        cursor: pointer;
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
    const [vmName, setVmName] = useState<string>(name || '');
    const [ip, setIp] = useState<string>('192.168.0.1');
    const [os, setOs] = useState<string>('Ubuntu');
    const [cpu, setCpu] = useState<number>(2);
    const [ram, setRam] = useState<number>(6);
    const [storage, setStorage] = useState<number>(32);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [errMessage, setErrMessage] = useState<string>('');

    const onTurnOn = async () => {
        console.log('turn on');
    };

    const onSuspend = async () => {
        console.log('suspend');
    };

    const onShutdown = async () => {
        console.log('shutdown');
    };

    //TODO: axios get vm info, catch error
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <Container>
            <CSSTransition in={showEdit} mountOnEnter unmountOnExit timeout={300} classNames='edit'>
                {(state) => (
                    <div>
                        <VMEdit
                            setVmName={setVmName}
                            setCpu={setCpu}
                            setOs={setOs}
                            setRam={setRam}
                            setStorage={setStorage}
                            minStorage={storage}
                            close={() => setShowEdit(false)}
                        />
                    </div>
                )}
            </CSSTransition>
            <Header>
                <h1>
                    <GrVirtualMachine size={30} />

                    {vmName}
                </h1>
                <div>
                    <div>
                        Status: <div className='status'>Running</div>
                    </div>
                    <div className='btnGroup'>
                        <button className='btnTurnOn' onClick={() => onTurnOn()}>
                            Turn on
                        </button>
                        <button className='btnSuspend' onClick={() => onSuspend()}>
                            Suspend
                        </button>
                        <button className='btnShutdown' onClick={() => onShutdown()}>
                            Shutdown
                        </button>
                    </div>
                </div>
            </Header>
            <Info>
                <div>
                    IPv4:{' '}
                    {ip && (
                        <>
                            <p ref={ipRef}>{ip}</p>
                            <AiOutlineCopy
                                size={20}
                                className='copyBtn'
                                onClick={() => {
                                    if (ipRef.current !== null) {
                                        console.log(ipRef.current.innerHTML);
                                        navigator.clipboard
                                            .writeText(ip)
                                            .then(() => alert('ip copied'))
                                            .catch(console.log);
                                    }
                                }}
                            />
                        </>
                    )}
                </div>

                <div>
                    Operating system: <p>{os}</p>
                </div>
                <div>
                    vCPU: <p>{cpu}</p>
                </div>
                <div>
                    Ram: <p>{ram}GB</p>
                </div>
                <div>
                    Storage: <p>{storage}GB</p>
                </div>
            </Info>
            <div>
                <button onClick={() => setShowEdit(true)}>Edit virtual machine</button>
            </div>
        </Container>
    );
};

export default VMDetails;

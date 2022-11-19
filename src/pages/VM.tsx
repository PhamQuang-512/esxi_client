import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isAxiosError } from '../api/axios';
import VM from '../model/VM';
import { getVMList } from '../api/vm';
import Loading from '../components/Loading';

const TableContainer = styled.div`
    margin: 0 12px;
`;

const Heading = styled.h1`
    margin: 20px 0;
`;

const Table = styled.table`
    width: 100%;
    margin: auto;
    table-layout: fixed;

    th {
        padding: 12px;
        background-color: var(--main-color);
        color: white;
    }

    th:nth-child(3) {
        width: 10%;
    }

    td {
        padding: 8px;
    }

    td:first-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    td {
        text-align: center;
    }
`;

const Home = () => {
    const [VMs, setVMs] = useState<VM[]>([]);
    const [errMessage, setErrMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const getVMs = async () => {
        try {
            setLoading(true);
            const data = await getVMList();

            setVMs(data);
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

    useEffect(() => {
        getVMs();

        return () => {};
    }, []);

    return (
        <div>
            <TableContainer>
                <Heading>Virtual machine list</Heading>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Operating system</th>
                            <th>vCPU</th>
                            <th>RAM</th>
                            <th>Storage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Link to={`/vm/HIHI`}>HIHI</Link>
                            </td>
                            <td>On</td>
                            <td>Ubuntu</td>
                            <td>3vCPU</td>
                            <td>8GB</td>
                            <td>44GB</td>
                        </tr>
                        {VMs.map((vm) => {
                            return (
                                <tr key={vm.id}>
                                    <td>
                                        <Link to={`/vm/${vm.name}`}>{vm.name}</Link>
                                    </td>
                                    <td>{vm.state}</td>
                                    <td>{vm.os}</td>
                                    <td>{vm.numCPU}</td>
                                    <td>{vm.ramGB}GB</td>
                                    <td>{vm.storage}GB</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <div>
                    <p>{VMs.length === 0 && 'No virtual machine found'}</p>
                </div>

                <div>
                    <p style={{ color: 'red' }}>{errMessage}</p>
                </div>
            </TableContainer>
            {loading && <Loading />}
        </div>
    );
};

export default Home;

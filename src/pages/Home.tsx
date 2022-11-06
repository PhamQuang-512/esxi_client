import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiIndeterminateCircleLine } from 'react-icons/ri';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { userContext } from '../context/UserContext';

const TableContainer = styled.div`
    padding: 0 12px;
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
    const { user } = useContext(userContext);

    if (!user) return <Navigate to='/login' />;

    return (
        <div>
            <TableContainer>
                <Heading>Virtual machine list</Heading>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>IP</th>
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
                                <Link to={`/vm/${'deptrai'}`}>dep trai</Link>
                            </td>
                            <td>192.168.1.1</td>
                            <td style={{ color: 'green' }}>
                                <HiOutlineCheckCircle /> On
                            </td>
                            <td>Window</td>
                            <td>4</td>
                            <td>2GB</td>
                            <td>40GB</td>
                        </tr>
                        <tr>
                            <td>
                                <Link to={`/vm/${'deptrai12222'}`}>dep trai 1 2 2 2 2 22 </Link>
                            </td>
                            <td>192.168.1.1</td>
                            <td>
                                <RiIndeterminateCircleLine /> Terminated
                            </td>
                            <td>Window</td>
                            <td>4</td>
                            <td>2GB</td>
                            <td>40GB</td>
                        </tr>
                    </tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Home;

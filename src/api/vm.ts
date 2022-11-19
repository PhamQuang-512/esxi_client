import { VMCreate } from '../model/VM';
import api from './axios';

export const getVMList = async () => {
    const response = await api.get('/VMs', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    return response.data;
};

export const getVM = async (name: string) => {
    const response = await api.get(`/VMs/${name}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    return response.data;
};

export const createVM = async (vmInfo: VMCreate) => {
    const response = await api.post('/VMs', vmInfo, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    return response.data;
};

export const editVMState = async (name: string, state: 'PowerdOn' | 'PoweredOff' | 'Suspended') => {
    const response = await api.put(
        `/VMs/${name}`,
        {
            state,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    );

    return response.data;
};

export const editVMHardDisk = async (name: string, storage: number) => {
    const response = await api.put(
        `/VMs/${name}`,
        {
            storage,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    );

    return response.data;
};

export const editVMCPURam = async (name: string, numCPU: number, ramGB: number) => {
    const response = await api.put(
        `/VMs/${name}`,
        {
            numCPU,
            ramGB,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        }
    );

    return response.data;
};

export const deleteVM = async (name: string) => {
    const response = await api.delete(`/VMs/${name}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    return response.data;
};

export interface VMCreate {
    name: string;
    os: string;
    numCPU: string | number;
    ramGB: string | number;
    storage: string | number;
}

export default interface VM extends VMCreate {
    id: string;
    state: string;
    ip: string;
}

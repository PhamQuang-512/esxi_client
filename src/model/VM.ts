export interface VMCreate {
    name: string;
    os: string;
    numCPU: string | number;
    ramGB: string | number;
    storage: string | number;
    publicKey: string;
}

export default interface VM extends VMCreate {
    id: string | null;
    state: string;
    ip: string;
}

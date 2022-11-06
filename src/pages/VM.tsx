import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const VM = () => {
    const { name } = useParams();

    return (
        <div>
            VM {name}
            <Outlet />
        </div>
    );
};

export default VM;

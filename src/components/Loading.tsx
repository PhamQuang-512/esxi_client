import React from 'react';
import styled from 'styled-components';

const Load = styled.div`
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);

    .lds-facebook {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 80px;
        height: 80px;
    }
    .lds-facebook div {
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: #cccccc;
        animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .lds-facebook div:nth-child(1) {
        left: 8px;
        animation-delay: -0.24s;
    }
    .lds-facebook div:nth-child(2) {
        left: 32px;
        animation-delay: -0.12s;
    }
    .lds-facebook div:nth-child(3) {
        left: 56px;
        animation-delay: 0;
    }
    @keyframes lds-facebook {
        0% {
            top: 8px;
            height: 64px;
        }
        50%,
        100% {
            top: 24px;
            height: 32px;
        }
    }
`;

const Loading = () => {
    return (
        <Load>
            <div className='lds-facebook'>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </Load>
    );
};

export default Loading;

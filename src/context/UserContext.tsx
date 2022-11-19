import React, { createContext, useState, useCallback, ReactNode } from 'react';

export const user = '';

export const userContext = createContext({
    user,
    login: (user: string, accessToken: string) => {},
    logout: () => {},
});

const UserContext = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string>(localStorage.getItem('user') || '');

    const login = (user: string, accessToken: string) => {
        localStorage.setItem('user', user);
        localStorage.setItem('accessToken', accessToken);
        setUser(user);
    };

    const logout = useCallback(() => {
        localStorage.clear();
        setUser('');
    }, []);

    return (
        <userContext.Provider value={{ user: user, login, logout }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;

import React, { ReactNode } from 'react';

export interface ContainerProps {
    children: ReactNode;
}

export const SiteContainer = ({ children }: ContainerProps) => {
    return <div className='bg-gray-200 p-10 min-h-screen'>{children}</div>;
};

import { ReactNode } from 'react';

export interface GridTileProps {
    children: ReactNode;
}

export const GridTile = ({ children }: GridTileProps) => {
    return (
        <div key={1} className='flex rounded-lg bg-white text-center shadow justify-center align-middle items-center w-full'>
            {children}
        </div>
    );
};

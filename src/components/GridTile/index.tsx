import { ReactNode } from 'react';

export interface GridTileProps {
    children: ReactNode;
    maxCols?: number;
}

export const GridTile = ({ children, maxCols }: GridTileProps) => {
    //TODO maybe add control over how many grid tile they want

    return (
        <div role='list' className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {children}
        </div>
    );
};

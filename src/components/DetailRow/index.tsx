import React from 'react';

export interface DetailRowProps {
    title: string;
    detail: string;
}

export const DetailRow = ({ title, detail }: DetailRowProps) => {
    return (
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>{title}</dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>{detail}</dd>
        </div>
    );
};

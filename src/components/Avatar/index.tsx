import Image from 'next/image';
import React from 'react';

export interface AvatarSrc {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface AvatarProps {
    source: AvatarSrc;
    size?: 'thumbnail' | 'medium' | 'large';
}

export const Avatar = ({ source, size = 'medium' }: AvatarProps) => {
    const profilePicture = source[size];

    return (
        <div className='relative h-16 w-16 sm:h-28 sm:w-28 rounded-full overflow-hidden'>
            <Image
                src={profilePicture}
                fill={true}
                alt='Profile'
                objectFit='cover'
                quality={75} // You can adjust the quality as needed
            />
        </div>
    );
};

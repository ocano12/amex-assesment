import { Profile } from '@src/models/profile';
import { Avatar } from '../Avatar';
import Link from 'next/link';

export interface ProfileCard {
    profile: Profile;
    onClick?: () => void;
}

export const ProfileCard = ({ profile, onClick }: ProfileCard) => {
    return (
        <Link href={`/profile/${profile.email}`}
            className='flex rounded-lg bg-white text-center shadow justify-center align-middle items-center w-full cursor-pointer hover:border-indigo-300 border-2'
        >
            <div className='flex flex-col items-center p-8'>
                <Avatar source={profile.picture} size='large' />
                <h3 className='mt-6 text-sm sm:text-base font-semibold leading-7 tracking-tight text-gray-900'>
                    {`${profile.name.first} ${profile.name.last}`}, {profile.dob.age}
                </h3>
                <p className='text-xs sm:text-sm leading-6 text-gray-600'>{`${profile.location.city}, ${profile.location.country}`}</p>
            </div>
        </div>
    );
};

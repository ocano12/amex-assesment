import React, { useState, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { Profile } from '@src/models/profile';
import { GridTile, SiteContainer, Search, ProfileCard } from '@components';
import Image from 'next/image';
import listIcon from '../../../public/list-ul-alt-svgrepo-com.svg';
import gridIcon from '../../../public/grid-svgrepo-com.svg';
import { getCache } from '@src/utils/caching';

// TODO: details page
// TODO: finish up some components
// TODO: pagination for more user
// TODO: lighthouse performace
// TODO: translations

export const getServerSideProps: GetServerSideProps = async (context) => {
    const profiles = getCache('profiles');

    if (!profiles) {
        return {
            props: {
                error: true,
            },
        };
    }

    return {
        props: {
            profiles: profiles,
        },
    };
};

//TODO: clean up some of the types
export interface UserPageProps {
    profiles?: Profile[];
    error?: boolean;
}

export default function ProfilePage(props: UserPageProps) {
    const { profiles, error } = props;

    const [isGrid, setIsGrid] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');

    //TODO: make this better and retry button?
    if (error) {
        return <div>Error occured please try again</div>;
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    //using memo here in case the user changes other states but people or search doesnt change
    const filteredProfiles = useMemo(() => {
        if (search === '') {
            return profiles;
        }

        return (
            profiles?.filter((profile) => profile.name.first.toLowerCase().includes(search.toLowerCase()) || profile.name.last.toLowerCase().includes(search.toLowerCase())) || []
        );
    }, [search, profiles]);

    //TODO: clean up UI see what can be components

    return (
        <>
            <SiteContainer>
                <div className='flex justify-center flex-col items-center'>
                    <div className='sm:max-w-[80%] w-full flex flex-col justify-center'>
                        <div className='mb-4'>
                            <h1 className='text-5xl font-bold my-4'>Users</h1>
                        </div>
                        <div className='flex flex-row items-center mb-4 justify-between'>
                            <div className='basis-4/5'>
                                <Search search={search} handleSearchChange={handleSearchChange} />
                            </div>
                            <div className='flex flex-row gap-1'>
                                {/* TODO: rip this out into a component and make sure icon stays centered. */}
                                <div className={`bg-white rounded p-2 ${isGrid ? ' border-2 border-sky-500' : null}`} onClick={() => setIsGrid(true)}>
                                    <Image priority src={gridIcon} alt='grid' className='w-5 h-5 sm:w-8 sm:h-8 md:w-7 md:h-7' />
                                </div>
                                <div className={`bg-white rounded p-2 ${!isGrid ? 'border-2 border-sky-500' : null}`} onClick={() => setIsGrid(false)}>
                                    <Image priority src={listIcon} alt='list' className='w-5 h-5 sm:w-8 sm:h-8 md:w-7 md:h-7' />
                                </div>
                            </div>
                        </div>

                        <GridTile>
                            {filteredProfiles && filteredProfiles.length > 0 ? (
                                filteredProfiles?.map((profile: Profile) => {
                                    return (
                                        <div key={profile.email}>
                                            <ProfileCard profile={profile} />
                                        </div>
                                    );
                                })
                            ) : (
                                // TODO: Add more here for ui
                                <p> No one Found!</p>
                            )}
                        </GridTile>
                    </div>
                </div>
            </SiteContainer>
        </>
    );
}

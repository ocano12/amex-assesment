import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { Person, RandomUserApiResponse } from '@src/models/person';
import { Avatar } from '@components/Avatar';
import { Cipher } from 'crypto';
import { GridTile } from '@components/GridTile';
import { SiteContainer } from '@components/SiteContainer';

export const getServerSideProps: GetServerSideProps = async (context) => {
    //TODO: just get 10 people for now. maybe later we can get custom number
    try {
        const getPeopleResponse: AxiosResponse<RandomUserApiResponse> = await axios.get(`${process.env.CLIENT_DOMAIN}/api/people`, {
            params: {
                numberOfPeople: 10,
            },
        });

        return {
            props: {
                people: getPeopleResponse.data.results,
            },
        };
    } catch (error) {
        //TODO: return error true so that UI can at least notify the user and they can retry

        console.log(error);
        return {
            props: {
                error: true,
            },
        };
    }
};

//TODO: clean up some of the types
export interface HomeProps {
    people?: Person[];
    error?: boolean;
}

export default function Home(props: HomeProps) {
    const { people, error } = props;
    const [isGrid, setIsGrid] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');

    //TODO: make this better and retry button?
    if (error) {
        console.log('error');
        return <div>Error occured please try again</div>;
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    let filteredPeople = people;

    if (search !== '') {
        filteredPeople = people?.filter(
            (person) => person.name.first.toLowerCase().includes(search.toLowerCase()) || person.name.last.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <>
            <SiteContainer>
                <div className='flex justify-center flex-col items-center'>
                    <div className='mb-20'>
                        <h1 className='text-5xl font-bold my-4'>My Users</h1> {/* Add your title here */}
                    </div>
                    <div className='sm:max-w-[80%] w-full flex flex-col justify-center'>
                        <div className='flex flex-row items-center mb-4 justify-between'>
                            <div className='basis-4/5'>
                                <input
                                    className='border rounded-md p-2  md:w-4/5 lg:w-2/3 xl:w-1/2 2xl:w-1/3  w-full'
                                    onChange={handleSearchChange}
                                    value={search}
                                    alt='search'
                                    placeholder='Search...'
                                />
                            </div>
                            <div className=''>
                                <button>click</button>
                            </div>
                        </div>

                        <div role='list' className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                            {filteredPeople?.map((person: Person) => {
                                return (
                                    <GridTile>
                                        <div className='flex flex-col items-center p-8'>
                                            <Avatar source={person.picture} size='large' />
                                            <h3 className='mt-6 text-sm sm:text-base font-semibold leading-7 tracking-tight text-gray-900'>{`${person.name.first} ${person.name.last}`}</h3>
                                            <p className='text-xs sm:text-sm leading-6 text-gray-600'>{person.location.city}</p>
                                        </div>
                                    </GridTile>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </SiteContainer>
        </>
    );
}

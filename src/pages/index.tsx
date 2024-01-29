import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { RandomUserApiResponse } from '@src/models/profile';
import { setCache } from '@src/utils/caching';
import Link from 'next/link';
import { SiteContainer } from '@src/components';

// TODO: finish up some components
// TODO: better error ui
// TODO: pagination for more user
// TODO: lighthouse performace
// TODO: translations

export const getServerSideProps: GetServerSideProps = async (context) => {
    //TODO: just get 10 people for now. maybe later we can get custom number
    try {
        const getProfileResponse: AxiosResponse<RandomUserApiResponse> = await axios.get(`${process.env.CLIENT_DOMAIN}/api/profiles`, {
            params: {
                numberOfProfiles: 10,
            },
        });

        setCache('profiles', getProfileResponse.data.results);

        return {
            props: {},
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                error: true,
            },
        };
    }
};

export default function HomePage() {
    return (
        <SiteContainer>
            <div className='flex justify-center items-center flex-col'>
                <Link href='/profile'>
                    <button
                        type='button'
                        className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                    >
                        View Profiles
                    </button>
                </Link>
            </div>
        </SiteContainer>
    );
}

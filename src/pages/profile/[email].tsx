import { Profile } from '@src/models/profile';
import { GetServerSideProps } from 'next';
import { getCache } from '@src/utils/caching';

export interface ProfileDetailsProps {
    profile: Profile;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;
    // let profile = getCache(params?.id);

    // if (!profile) {
    //     //error handle
    // }

    return {
        props: '',
    };
};

export const PersonDetails = ({ profile }: ProfileDetailsProps) => {};

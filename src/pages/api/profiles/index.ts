import { NextApiRequest, NextApiResponse } from 'next';
import { RandomUserApi } from '@src/utils/RandomUserApi';
import { RandomUserApiResponse } from '@src/models/profile';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { numberOfProfiles } = req.query;

    try {
        const profileResponse: RandomUserApiResponse = await RandomUserApi('GET', `/api/?results=${numberOfProfiles}`);

        res.json(profileResponse);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

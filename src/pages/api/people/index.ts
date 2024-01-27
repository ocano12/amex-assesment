import { NextApiRequest, NextApiResponse } from 'next';
import { RandomUserApi } from '@src/utils/RandomUserApi';
import { RandomUserApiResponse } from '@src/models/person';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { numberOfPeople } = req.query;

    console.log(numberOfPeople);

    try {
        const peopleResponse: RandomUserApiResponse = await RandomUserApi('GET', `/api/?results=${numberOfPeople}`);

        res.json(peopleResponse);
    } catch (error: any) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
};

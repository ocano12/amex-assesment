import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse, Method } from 'axios';
import { RandomUserApiResponse } from '@src/models/person';

//This is probably overkill for this specific case but its good practice for endpoints with many differnt routes.

export const RandomUserApi = async (method: Method = 'GET', endpoint: string, data?: Request): Promise<RandomUserApiResponse> => {
    console.log(process.env.RANDOM_USER_HOST + endpoint);
    try {
        const response = await axios({
            method,
            url: process.env.RANDOM_USER_HOST + endpoint,
            data: data,
        });

        if (response.status !== 200) {
            throw new Error(`Failed to fetch ${endpoint} Status: ${response.status}, ${response.statusText}`);
        }

        return response.data as RandomUserApiResponse;
    } catch (error: any) {
        throw new Error(`Random User Api failed because ${error.response.status} ${error.response.statusText}`);
    }
};

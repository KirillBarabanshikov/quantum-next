import { apiClient } from '@/shared/api';

import { mapUser } from '../lib';
import { IUser } from '../model';

export async function me(): Promise<IUser | undefined> {
    try {
        const response = await apiClient.get<IUser>('/me');
        return mapUser(response.data);
    } catch (e) {
        console.error(e);
    }
}

export async function createProfile(body: any) {
    try {
        await apiClient.post('/payer_profiles/create', body);
    } catch (e) {
        console.error(e);
        throw new Error(`${e}`);
    }
}

export async function deleteProfile(id: number) {
    try {
        await apiClient.delete(`/payer_profiles/delete/${id}`);
    } catch (e) {
        console.error(e);
        throw new Error(`${e}`);
    }
}

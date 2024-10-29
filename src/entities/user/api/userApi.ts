import { apiClient } from '@/shared/api';

export async function createProfile(body: any) {
    try {
        await apiClient.post('/payer_profiles/create', body);
    } catch (e) {
        console.error(e);
        throw new Error(`${e}`);
    }
}

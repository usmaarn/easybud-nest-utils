import { RestClient } from '@/shared/lib/rest-client';
import { User } from '../dtos/response/user.dto';
import { Routes } from '../routes';

export class AuthService {
  constructor(private readonly client: RestClient) {}

  async getUser(id: string, accessToken: string): Promise<User | null> {
    const response = await this.client.get<User>(Routes.Auth.GetProfile, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    if (response.success) {
      return response.data;
    }

    console.log(response);
    return null;
  }
}

import { Routes, User } from "@/gateway/index.js";
import { RestClient } from "@/lib/index.js";

export class AuthService {
  constructor(private readonly client: RestClient) {}

  async getUser(id: string, accessToken: string): Promise<User | null> {
    const response = await this.client.get<User>(Routes.Auth.GetProfile, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (response.success) {
      return response.data;
    }

    console.log(response);
    return null;
  }
}

import { GatewayException } from "@/exceptions/gateway.exception.js";
import { CacheService } from "@/interfaces.js";
import { AUTH_SERVICE_URL, CACHE_SERVICE } from "@/tokens.js";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "./dto/user-response.dto.js";
import { Routes } from "@/common/routes.js";

export interface GetUserCommand {
  id: string;
  token: string;
}

@Injectable()
export class GetUserService {
  constructor(
    @Inject(AUTH_SERVICE_URL)
    private readonly url: string,

    @Inject(CACHE_SERVICE)
    private readonly cache: CacheService,
  ) {}

  async execute(cmd: GetUserCommand): Promise<User | null> {
    const cacheKey = "users:" + cmd.id;

    const user = await this.cache.get<User>(cacheKey);

    if (user != null) {
      return user;
    }

    const res = await fetch(this.url + Routes.GetProfile, {
      headers: {
        Authorization: "Bearer " + cmd.token,
      },
    });

    const data = (await res.json()) as any;

    if (!res.ok) {
      throw new GatewayException("unable to get user", "auth", data);
    }

    await this.cache.set(cacheKey, data.data);

    return data.data;
  }
}

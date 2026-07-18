import { GatewayException } from "@/exceptions/gateway.exception.js";
import { CacheService } from "@/interfaces.js";
import { CACHE_SERVICE, GATEWAY_OPTIONS } from "@/tokens.js";
import { Inject, Injectable } from "@nestjs/common";
import { Routes } from "../routes.js";
import { User } from "../user-response.dto.js";
import { GatewayOptions } from "../index.js";

export interface GetUserCommand {
  id: string;
  token: string;
}

@Injectable()
export class GetUserService {
  constructor(
    @Inject(GATEWAY_OPTIONS)
    private readonly opt: GatewayOptions,

    @Inject(CACHE_SERVICE)
    private readonly cache: CacheService,
  ) {}

  async execute(cmd: GetUserCommand): Promise<User | null> {
    const cacheKey = "users:" + cmd.id;

    const user = await this.cache.get<User>(cacheKey);

    if (user != null) {
      return user;
    }

    const res = await fetch(this.opt.authUrl + Routes.Auth.GetProfile, {
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

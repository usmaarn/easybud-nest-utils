import { GatewayException } from "@/exceptions/gateway.exception.js";
import { CacheService } from "@/interfaces.js";
import { AUTH_SERVICE_URL, CACHE_SERVICE } from "@/tokens.js";
import { Inject, Injectable } from "@nestjs/common";
import { Routes } from "../common/routes.js";

export interface GetJwtSecretCommand {}

@Injectable()
export class GetJwtSecretService {
  constructor(
    @Inject(AUTH_SERVICE_URL)
    private readonly url: string,

    @Inject(CACHE_SERVICE)
    private readonly cache: CacheService,
  ) {
    console.log("initiated!");
  }

  async execute(cmd: GetJwtSecretCommand): Promise<string | null> {
    const cacheKey = "jwt-secret";
    const secret = await this.cache.get<string>(cacheKey);

    if (secret) {
      console.log("jwt cached key:", secret);
      return secret;
    }

    const res = await fetch(this.url + Routes.GetJwtKey, {
      headers: {
        // Authorization: "Bearer " + cmd.token,
      },
    });

    const data = await res.text();

    if (!res.ok) {
      throw new GatewayException("unable to get jet key", "auth", data);
    }

    await this.cache.set(cacheKey, data);

    console.log("jwt caching key...:", data);

    return data;
  }
}

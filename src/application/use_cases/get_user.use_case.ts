import {
  GetUserCommand,
  GetUserResponse,
  GetUserService,
} from '@/profiles/application/ports/users.service';
import { RedisService } from '@/shared/adapters/cache/redis.service';
import { RequestContext } from '@/shared/adapters/contexts/request-user';
import { User } from '@/shared/adapters/gateway/dtos/response/user.dto';
import { AuthService } from '@/shared/adapters/gateway/services/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserUseCase implements GetUserService {
  constructor(
    private readonly auth: AuthService,
    private readonly redis: RedisService,
    private readonly context: RequestContext,
  ) {}
  async execute(cmd: GetUserCommand): Promise<GetUserResponse | null> {
    const cachedUser = await this.redis.hget<User>(
      this.redis.keys.user(cmd.id),
    );
    if (cachedUser) {
      return {
        name: cachedUser.first_name + ' ' + cachedUser.last_name,
        emailAddress: cachedUser.email,
        phoneNumber: cachedUser.phone,
        gender: cachedUser.gender,
        dateOfBirth: cachedUser.date_of_birth,
      };
    }

    const fetchedUser = await this.auth.getUser(cmd.id, this.context.)

    return null;
  }
}

// import { session } from '@/shared/lib/session';
import { CanActivate, UnauthorizedException } from "@nestjs/common";

export class SubscriptionGuard implements CanActivate {
  constructor() {}
  async canActivate(): Promise<boolean> {
    // const user = session.getUser();

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // const profile = await this.entitiyManager.findOneBy(Profile, {
    //   userId: user.id,
    // });

    // if (!profile) {
    //   throw new ForbiddenException(
    //     'Please create account to access this resource',
    //   );
    // }

    // if (!profile.hasSubscription()) {
    //   throw new ForbiddenException('No Subscription or Subscription expired');
    // }

    return true;
  }
}

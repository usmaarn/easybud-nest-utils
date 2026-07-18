// import { session } from '@/shared/lib/session';
// import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
// import { trace } from '@opentelemetry/api';
// import { NextFunction, Request, Response } from 'express';
// import { EntityManager } from 'typeorm';

// @Injectable()
// export class AccountActiveMiddleware implements NestMiddleware {
//   private readonly logger = new Logger(AccountActiveMiddleware.name);
//   private readonly tracer = trace.getTracer('account', '1.0');

//   constructor(private readonly manager: EntityManager) {}

//   async use(req: Request, res: Response, next: NextFunction) {
//     return this.tracer.startActiveSpan('auth.middleware', async (span) => {
//       try {
//         const user = session.getUser();
//         span.addEvent('fetching profile for user...', {
//           user: JSON.stringify(user),
//         });
//         // const profile = await this.manager.findOne(Profile, {
//         //   withDeleted: true,
//         //   where: { userId: user.id },
//         // });

//         // if (profile) {
//         //   span.addEvent('profile fetched', {
//         //     profile: JSON.stringify(profile),
//         //   });
//         //   if (
//         //     profile.status.toLowerCase() != ProfileStatus.ACTIVE ||
//         //     profile.deletedAt != null
//         //   ) {
//         //     span.addEvent('Abnormal Account status', {
//         //       userId: profile.userId,
//         //       status: profile.status,
//         //       deletedAt: profile.deletedAt?.toString(),
//         //     });
//         //     this.logger.log({
//         //       message: 'Abnormal Account status',
//         //       userId: profile.userId,
//         //       status: profile.status,
//         //       deletedAt: profile.deletedAt,
//         //     });
//         //     throw new ForbiddenException('Abnormal user account status');
//         //   }
//         // }
//         // next();
//       } catch (error: any) {
//         span.recordException(error);
//         this.logger.error(error);
//       } finally {
//         span.end();
//       }
//     });
//   }
// }

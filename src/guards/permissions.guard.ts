import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

export type Permission =
  | "user.approve"
  | "user.decline"
  | "user.status"
  | "user.suspend"
  | "user.unsuspend"
  | "user.ban"
  | "user.unban"
  | "jobs.approve"
  | "jobs.decline";

export const Permissions = Reflector.createDecorator<Permission[]>();

export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const user = session.getUser();
    const permissions = this.reflector.get(Permissions, context.getHandler());
    if (!permissions) return true;
    // return Helper.isAdmin(user) || Helper.hasPermissions(user, permissions);
    return true;
  }
}

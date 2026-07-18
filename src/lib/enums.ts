export enum TripMemberStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
  BLOCKED = "blocked",
  REMOVED = "removed",
}

export enum Queue {
  EMAIL = "notify.email",
  SMS = "notify.sms",
  IN_APP = "notify.in-app",
  PUSH = "notify.push",
}

export enum ProfileStatus {
  PENDING = "pending",
  INACTIVE = "inactive",
  ACTIVE = "active",
  SUSPENDED = "suspended",
}

export enum Visibility {
  ALL = "all",
  CONTACTS = "contacts",
  FRIENDS = "friends",
  HIDDEN = "hidden",
}

export enum ErrorCode {
  GATEWAY_EXCEPTION = "GATEWAY_EXCEPTION",
  VALIDATION_EXCEPTION = "VALIDATION_EXCEPTION",
  INVALID_REQUEST_BODY = "INVALID_REQUEST_BODY",
}

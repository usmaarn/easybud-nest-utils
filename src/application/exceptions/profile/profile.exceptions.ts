export class ProfileExistException extends Error {
  constructor() {
    super('account already exist.');
  }
}

export class AccountNotFoundException extends Error {
  constructor() {
    super('account not found.');
  }
}

export class InterestNotFoundException extends Error {
  constructor(public readonly id?: string) {
    super('interest not found');
  }
}

export class InterestsNotFoundException extends Error {
  constructor(public readonly ids?: string[]) {
    super(`interests not found: ${ids}`);
  }
}

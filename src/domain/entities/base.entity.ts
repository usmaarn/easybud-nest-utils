export abstract class Entity<T> {
  protected constructor(protected readonly props: T) {}

  get data() {
    return this.props;
  }

  static rehydrate<T, E>(this: new (props: T) => E, props: T): E {
    return new this(props);
  }
}

import { UnauthorizedException } from '@nestjs/common';

class Session {
  private _data: Map<string, any> = new Map();

  set<T = any>(key: string, value: T) {
    this._data.set(key, value);
  }

  get<T = any>(key: string): T {
    return this._data.get(key) as T;
  }

  delete(key: string): boolean {
    this._data.delete(key);
    return true;
  }

  getUser() {
    const user = this.get<any>('user');
    if (!user) throw new UnauthorizedException('unauthenticated');
    return user;
  }
}

export const session = new Session();

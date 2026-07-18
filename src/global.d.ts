declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        permissions: string[];
        roles: string[];
      };
    }
  }
}

export {};

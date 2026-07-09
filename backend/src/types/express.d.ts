// This file extends Express's built-in Request type so TypeScript knows
// that, after our auth middleware runs, req.user might exist.

export interface AuthPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export {};
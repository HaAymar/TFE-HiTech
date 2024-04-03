// src/auth/constants.ts

export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'secretKey',
};

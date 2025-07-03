import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const SESSION_CONFIG = {
  cookieName: "session-id",
  maxAge: 60 * 60 * 24 * 7, // 1 week
  accessTokenMaxAge: 60 * 60, // 1 hour
  refreshTokenMaxAge: 60 * 60 * 24 * 7, // 1 week
} as const;

export type SessionConfig = typeof SESSION_CONFIG;

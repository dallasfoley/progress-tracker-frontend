// lib/jwt-session.ts
import { redis, SESSION_CONFIG } from "./upstash";
import { cookies } from "next/headers";
import { nanoid } from "nanoid";
import type { User } from "@/schema/UserSchema";

export interface JWTSessionData {
  user: User;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
  createdAt: number;
  lastActivity: number;
}

// lib/session.ts

export class JWTSessionManager {
  private static generateSessionId(): string {
    return nanoid(32);
  }

  private static getSessionKey(sessionId: string): string {
    return `jwt_session:${sessionId}`;
  }

  static async createSession(
    user: User,
    accessToken: string,
    refreshToken: string
  ): Promise<string> {
    const sessionId = this.generateSessionId();
    const sessionKey = this.getSessionKey(sessionId);
    const now = Date.now();

    const sessionData: JWTSessionData = {
      user,
      accessToken,
      refreshToken,
      accessTokenExpiresAt: now + SESSION_CONFIG.accessTokenMaxAge * 1000,
      refreshTokenExpiresAt: now + SESSION_CONFIG.refreshTokenMaxAge * 1000,
      createdAt: now,
      lastActivity: now,
    };

    await redis.setex(
      sessionKey,
      SESSION_CONFIG.refreshTokenMaxAge,
      JSON.stringify(sessionData)
    );

    const cookieStore = await cookies();
    cookieStore.set(SESSION_CONFIG.cookieName, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_CONFIG.refreshTokenMaxAge,
      path: "/",
    });

    return sessionId;
  }

  static async getSession(): Promise<JWTSessionData | null> {
    try {
      const cookieStore = await cookies();
      const sessionId = cookieStore.get(SESSION_CONFIG.cookieName)?.value;
      if (!sessionId) return null;

      const sessionKey = this.getSessionKey(sessionId);
      const data = await redis.get(sessionKey);
      if (!data) return null;

      const session = JSON.parse(data as string) as JWTSessionData;
      const now = Date.now();

      if (now > session.refreshTokenExpiresAt) {
        await this.deleteSession();
        return null;
      }

      session.lastActivity = now;
      await redis.setex(
        sessionKey,
        SESSION_CONFIG.refreshTokenMaxAge,
        JSON.stringify(session)
      );

      return session;
    } catch (err) {
      console.error("Failed to get session", err);
      return null;
    }
  }

  static async deleteSession(): Promise<void> {
    try {
      const cookieStore = await cookies();
      const sessionId = cookieStore.get(SESSION_CONFIG.cookieName)?.value;
      if (sessionId) {
        await redis.del(this.getSessionKey(sessionId));
        cookieStore.delete(SESSION_CONFIG.cookieName);
      }
    } catch (err) {
      console.error("Failed to delete session", err);
    }
  }
}

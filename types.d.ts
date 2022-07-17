import type { DefaultUser } from "next-auth";

// Add id to Session type
// github.com/nextauthjs/next-auth/discussions/536#discussioncomment-1932922
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

import NextAuth, { DefaultSession } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { env } from "@/lib/env";
import KeycloakProvider from "next-auth/providers/keycloak";
import AzureADProvider from "next-auth/providers/azure-ad";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    idToken?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    error?: string;
    accessTokenExpires?: number;
  }
}

const { CLIENT_ID, SCOPE, ISSUER, TENANT_ID, PLATFORM } = env;

// This check ensures CLIENT_ID is defined
if (!CLIENT_ID) {
  throw new Error("CLIENT_ID environment variable is required");
}

if (!ISSUER) {
  throw new Error("ISSUER environment variable is required");
}

if (PLATFORM === "azure-ad" && !TENANT_ID) {
  throw new Error("TENANT_ID is required for Azure AD authentication");
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const tokenEndpoint =
      PLATFORM === "azure-ad"
        ? `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`
        : `${ISSUER}/protocol/openid-connect/token`;

    const params = {
      client_id: CLIENT_ID as string, // Type assertion since we checked it above
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!
    } as const;

    const response = await fetch(tokenEndpoint, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: new URLSearchParams(params)
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError"
    };
  }
}

const handler = NextAuth({
  providers: [
    ...(PLATFORM === "azure-ad"
      ? [
          AzureADProvider({
            clientId: CLIENT_ID,
            clientSecret: "",
            tenantId: TENANT_ID!,
            issuer: ISSUER,
            client: {
              token_endpoint_auth_method: "none"
            },
            authorization: {
              params: {
                scope: SCOPE ?? "openid profile email offline_access"
              }
            }
          })
        ]
      : [
          KeycloakProvider({
            clientId: CLIENT_ID,
            clientSecret: "",
            issuer: ISSUER,
            client: {
              token_endpoint_auth_method: "none"
            },
            authorization: {
              params: {
                scope: SCOPE ?? "openid profile email offline_access",
                response_type: "code"
              }
            }
          })
        ])
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, account }) {
      // Initial sign in
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at! * 1000;
        return token;
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to refresh it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        idToken: token.idToken,
        error: token.error
      };
    }
  }
});

export { handler as GET, handler as POST };

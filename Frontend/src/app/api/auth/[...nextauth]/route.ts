import NextAuth from "next-auth";
import { env } from "@/lib/env";
import KeycloakProvider from "next-auth/providers/keycloak";
import AzureADProvider from "next-auth/providers/azure-ad";

const { CLIENT_ID, SCOPE, ISSUER, TENANT_ID, PLATFORM } = env;
const handler = NextAuth({
  providers: [
    ...(PLATFORM === "azure-ad"
      ? [
          AzureADProvider({
            clientId: CLIENT_ID,
            clientSecret: null,
            tenantId: TENANT_ID,
            issuer: ISSUER,
            client: {
              token_endpoint_auth_method: "none"
            },
            authorization: {
              params: {
                scope: SCOPE
              }
            }
          })
        ]
      : [
          KeycloakProvider({
            clientId: CLIENT_ID,
            clientSecret: null,
            issuer: ISSUER,
            client: {
              token_endpoint_auth_method: "none"
            },
            authorization: {
              params: {
                scope: SCOPE,
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
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    }
  }
});

export { handler as GET, handler as POST };

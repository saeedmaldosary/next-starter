export const env = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080/api",
  ISSUER: process.env.NEXT_PUBLIC_ISSUER,
  CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
  TENANT_ID: process.env.NEXT_PUBLIC_TENANT_ID,
  SCOPE: process.env.NEXT_PUBLIC_SCOPE,
  PLATFORM: process.env.NEXT_PUBLIC_PLATFORM
};

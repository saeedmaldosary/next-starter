import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {
  console.log("req");
  console.log(req);

  // Custom middleware logic here if needed
});

export const config = {
  matcher: [
    // Protected routes
    "/en/dashboard/:path*"
  ]
};

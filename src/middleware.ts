import { auth } from "@/auth";

const protectedRoutes = ["/private"];

export default auth((req) => {
  if (!req.auth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const redirectComponent = encodeURIComponent(req.nextUrl.pathname);

    const newUrl = new URL(
      `/auth/login?to=${redirectComponent}`,
      req.nextUrl.origin
    );

    return Response.redirect(newUrl);
  }
});

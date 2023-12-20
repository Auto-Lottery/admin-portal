import { getLoggedUserCookie } from "@/services/auth-service";

export async function GET() {
  const res = getLoggedUserCookie();
  return Response.json({
    code: 200,
    data: res,
  });
}

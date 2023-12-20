import { getLoggedUserCookie } from "@/services/auth-service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().delete("AUTO_COOKIE");
  let response = NextResponse.json({
    code: 200,
    data: true,
  });
  response.cookies.delete("AUTO_COOKIE");
  return response;
}

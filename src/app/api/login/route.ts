import { NextRequest, NextResponse } from "next/server";
import { CustomResponse } from "@/types/custom-response";
import { AdminUserWithToken } from "@/types/user";
import { encryptData } from "@/utilities";
import { ssrRequests } from "@/config/serverSideClient";

export async function POST(req: NextRequest) {
  const bodyData = await req.json();
  const url = `${req.nextUrl.origin}/backend/admin/login`;
  const res = (await ssrRequests.post(
    url,
    bodyData
  )) as CustomResponse<AdminUserWithToken>;
  let response = NextResponse.json(res);
  if (res.code === 200) {
    const jsonString = JSON.stringify(res.data);
    const encryptedResult = encryptData(jsonString);
    response.cookies.set("AUTO_COOKIE", encryptedResult, {
      expires: (res.data.exp || 0) * 1000,
      path: "/",
      secure: true,
    });
  }

  return response;
}

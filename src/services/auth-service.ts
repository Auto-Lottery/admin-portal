import { AdminUserWithToken } from "@/types/user";
import { dataDecrypt } from "@/utilities";
import { cookies } from "next/headers";

export const getLoggedUserCookie = (): AdminUserWithToken | null => {
  const cookieData = cookies().get("AUTO_COOKIE")?.value;
  try {
    if (!cookieData) {
      return null;
    }
    const loggedUserData = JSON.parse(
      dataDecrypt(cookieData)
    ) as AdminUserWithToken;
    if (loggedUserData.token) {
      return loggedUserData;
    }
    return null;
  } catch (err) {
    return null;
  }
};

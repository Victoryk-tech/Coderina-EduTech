"use server";

import { cookies } from "next/headers";

export const deleteCookies = async (name) => {
  (await cookies()).delete(name);
};

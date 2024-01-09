"use server";

import { redirect } from "next/navigation";

export default async function () {
  let shouldRedirect = false;

  if (!formData.get("id")) return { message: "no id" };
  if (!formData.get("name")) return { message: "no name" };
  if (!formData.get("password")) return { message: "no password" };
  if (!formData.get("image")) return { message: "no image" };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include",
      }
    );
    shouldRedirect = true;
    if (response.status === 403) return { message: "user_exists" };
    console.log("formData.get(id): ", formData.get("id"));
    console.log("response.status: ", response.status);
    console.log("await response.json(): ", response.json());
  } catch (error) {
    console.error(error);
    return;
  }
  if (shouldRedirect) redirect("/home"); // 절대 redirect는 try/catch문 안에 넣으면 안됨.

}
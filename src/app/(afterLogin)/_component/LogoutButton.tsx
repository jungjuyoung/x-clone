"use client";

import { signOut, useSession } from "next-auth/react";
import style from "./logoutButton.module.css";
import { useRouter } from "next/navigation";
import { Session } from "@auth/core/types";
import Image from "next/image";

type Props={
  me: Session | null
}
export default function LogoutButton({me}:Props) {
  const router = useRouter();
  // const { data: me } = useSession();
  // const me = {
  //   // 임시로 내 정보 있는것처럼
  //   id: "nadia",
  //   nickname: "나디아",
  //   image: "/5Udwvqim.jpg",
  // };

  if (!me?.user) return null;
  console.log("LogoutButton me: ", me);

  const onLogout = () => {
    console.log("LogoutButton call signOut at onLogout function");
    signOut({
      redirect: false,
    }).then(() => {
      router.replace("/");
    });
  };

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <Image src={me.user?.image as string} alt={me.user?.email as string} width={40} height={40}/>
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}

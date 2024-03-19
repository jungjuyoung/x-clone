"use client";

import { signOut } from "next-auth/react";
import style from "./logoutButton.module.css";
import { useRouter } from "next/navigation";
import { Session } from "@auth/core/types";
import Image from "next/image";
import { useQueryClient } from '@tanstack/react-query';

type Props={
  me: Session | null
}
export default function LogoutButton({me}:Props) {
  const router = useRouter();
  const queryClient = useQueryClient()

  if (!me?.user) return null;

  const onLogout = () => {
    queryClient.invalidateQueries({queryKey: ['posts']})
    queryClient.invalidateQueries({queryKey: ['users']})
    signOut({
      redirect: false,
    }).then(() => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`,{
        method: 'POST',
        credentials: 'include'
      })
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

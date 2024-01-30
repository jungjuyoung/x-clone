"use client";

import style from "./navMenu.module.css";
import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";
import {
  HomeIcon,
  HomeFillIcon,
  MessagesIcon,
  MessagesFillIcon,
  ExploreIcon,
  ExploreFillIcon,
  ProfileIcon,
  ProfileFillIcon,
} from "./ui";
import { useSession } from "next-auth/react";

export default function NavMenu() {
  const segment = useSelectedLayoutSegment();
  const { data: me } = useSession();

  console.log("NavMenu me: ", me);

  // const me = {
  //   // 임시로 내 정보 있는것처럼
  //   id: "nadia",
  // };

  const menu = [
    {
      href: "/home",
      onIcon: <HomeFillIcon />,
      offIcon: <HomeIcon />,
      title: "home",
    },
    {
      href: "/explore",
      onIcon: <ExploreFillIcon />,
      offIcon: <ExploreIcon />,
      title: "explore",
    },
    {
      href: "/messages",
      onIcon: <MessagesFillIcon />,
      offIcon: <MessagesIcon />,
      title: "messages",
    },
  ];

  return (
    <>
      {menu.map(({ href, onIcon, offIcon, title }) => (
        <li key={href}>
          <Link href={href}>
            <div className={style.navPill}>
              {segment === title ? onIcon : offIcon}
            </div>
          </Link>
        </li>
      ))}
      {me?.user?.email && (
        <li>
          <Link href={`/${me.user?.email}`}>
            <div className={style.navPill}>
              {segment === me.user?.email ? (
                <ProfileFillIcon />
              ) : (
                <ProfileIcon />
              )}
            </div>
          </Link>
        </li>
      )}
    </>
  );
}

"use client"

import style from './followRecommend.module.css';
import {User} from "@/model/User";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useSession} from "next-auth/react";
import cx from "classnames";
import Link from "next/link";
import {MouseEventHandler} from "react";

type Props = {
  user: User
}
export default function FollowRecommend({ user }: Props) {
  const { data: session } = useSession();
  const followed = !!user?.Followers?.find((v) => v.id === session?.user?.email);
  // console.log('[FollowRecommend]followed: ',followed)
  const queryClient = useQueryClient();
  const {mutate: follow} = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'post',
      })
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers: (shallow[index]._count?.Followers || 0) + 1,
          }
        }
        queryClient.setQueryData(["users", "followRecommends"], shallow)
      }
      const userInfo: User | undefined = queryClient.getQueryData(["users", userId]);
      console.log('[FollowRecommend] 변경을 가한다 follow', userInfo)
      if (userInfo) {
        const shallow = {
          ...userInfo,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...userInfo._count,
            Followers: (userInfo._count?.Followers || 0) + 1,
          }
        }
        queryClient.setQueryData(["users", userId], shallow)
      }
    },
    onError(error, userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        console.log('follow onError value: ',value, 'userId: ',userId,'index: ', index);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
          _count: {
            ...shallow[index]._count,
            Followers: (shallow[index]._count?.Followers || 0)- 1,
          }
        }
        queryClient.setQueryData(["users", "followRecommends"], shallow);
        const userInfo: User | undefined = queryClient.getQueryData(["users", userId]);
        console.log('[FollowRecommend] 변경을 가한다 follow 롤백', userInfo)
        if (userInfo) {
          const shallow = {
            ...userInfo,
            Followers: userInfo.Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...userInfo._count,
              Followers: (userInfo._count?.Followers || 0) - 1,
            }
          }
          queryClient.setQueryData(["users", userId], shallow)
        }
      }
    },
  })

  const {mutate: unfollow} = useMutation({
    mutationFn: (userId: string) => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'delete',
      })
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
          _count: {
            ...shallow[index]._count,
            Followers: (shallow[index]._count?.Followers || 0) - 1,
          }
        }
        queryClient.setQueryData(["users", "followRecommends"], shallow);
        const userInfo: User | undefined = queryClient.getQueryData(["users", userId]);
        console.log('[FollowRecommend] 변경을 가한다 unfollow', userInfo)
        if (userInfo) {
          const shallow = {
            ...userInfo,
            Followers: userInfo.Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...userInfo._count,
              Followers: (userInfo._count?.Followers || 0) - 1,
            }
          }
          queryClient.setQueryData(["users", userId], shallow)
        }
      }
    },
    onError(error, userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        const shallow = [...value];
        shallow[index] = {
          ...shallow[index],
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...shallow[index]._count,
            Followers:( shallow[index]._count?.Followers || 0) + 1,
          }
        }
        queryClient.setQueryData(["users", "followRecommends"], shallow)
      }
      const userInfo: User | undefined = queryClient.getQueryData(["users", userId]);
      console.log('[FollowRecommend] 변경을 가한다 unfollow 롤백', userInfo)
      if (userInfo) {
        const shallow = {
          ...userInfo,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...userInfo._count,
            Followers: (userInfo._count?.Followers || 0) + 1,
          }
        }
        queryClient.setQueryData(["users", userId], shallow)
      }
    },
  })
  
  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (followed) {
      unfollow(user.id);
    } else {
      follow(user.id);
    }
  };

  return (
    <Link href={`/${user.id}`} className={style.container}>
      <div className={style.userLogoSection}>
        <div className={style.userLogo}>
          <img src={user.image} alt={user.id} />
        </div>
      </div>
      <div className={style.userInfo}>
        <div className={style.title}>{user.nickname}</div>
        <div className={style.count}>@{user.id}</div>
      </div>
      <div className={cx(style.followButtonSection, followed && style.followed)}>
        <button onClick={onFollow}>{followed ? '팔로잉' : '팔로우'}</button>
      </div>
    </Link>
  )
}
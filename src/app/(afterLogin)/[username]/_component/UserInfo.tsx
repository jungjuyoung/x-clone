"use client";

import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {User} from "@/model/User";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";
import cx from "classnames";
import {MouseEventHandler} from "react";
import {Session} from "@auth/core/types";

type Props = {
  username: string;
  session: Session | null;
}
export default function UserInfo({username, session }: Props) {
  const {data: user, error} = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  const followed = user?.Followers?.find((v) => v.id === session?.user?.email);
  console.log('[UserInfo] followed: ',followed)
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
      console.log('[UserInfo] 변경을 가한다 follow', userInfo)
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
        console.log('[UserInfo] 변경을 가한다 follow 롤백', userInfo)
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
        console.log('[UserInfo] 변경을 가한다 unfollow', userInfo)
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
      console.log('[UserInfo] 변경을 가한다 unfollow 롤백', userInfo)
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
  

  // console.log('error');
  // console.dir(error);
  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton/>
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div style={{
          height: 100,
          alignItems: 'center',
          fontSize: 31,
          fontWeight: 'bold',
          justifyContent: 'center',
          display: 'flex'
        }}>
          계정이 존재하지 않음
        </div>
      </>
    )
  }
  if (!user) {
    return null;
  }

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
    <>
      <div className={style.header}>
        <BackButton/>
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userRow}>
          <div className={style.userImage}>
            <img src={user.image} alt={user.id}/>
          </div>
          <div className={style.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          {
            user.id !== session?.user?.email
            && <button 
            onClick={onFollow} 
            className={cx(style.followButton, followed && style.followed)}>{followed ? '팔로잉' : '팔로우'}</button>
          }
        </div>
        <div className={style.userFollower}>
          <div>
            {user?._count?.Followers} 팔로워
          </div>
          &nbsp;
          <div>
            {user?._count?.Followings} 팔로우 중
          </div>
        </div>
      </div>
    </>
  )
}
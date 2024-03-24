import style from "./chatRoom.module.css";
import cx from "classnames";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import MessageForm from './_component/MessageForm';
import { auth } from '@/auth';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getUserServer } from '../../[username]/_lib/getUserServer';
import UserInfo from './_component/UserInfo';
import WebSocketComponent from './_component/WebSocketComponent';

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props={
  params: {
    room: string
  }
}
export default async function ChatRoom({params}: Props) {
  const session = await auth();
  const queryClient = new QueryClient()
  const ids = params.room.split('-').filter(v => v !== session?.user?.email)
  if(!ids[0]) return null;
  await queryClient.prefetchQuery({queryKey: ['users', ids[0]], queryFn:getUserServer})
  const dehydratedState = dehydrate(queryClient)

  // const user = {
  //   id: "hero",
  //   nickname: "영웅",
  //   image: faker.image.avatar(),
  // };
  const messages = [
    {
      messageId: 1,
      roomId: 123,
      id: "zerohch0",
      content: "안녕하세요.",
      createdAt: new Date(),
    },
    {
      messageId: 2,
      roomId: 123,
      id: "hero",
      content: "안녕히가세요.",
      createdAt: new Date(),
    },
  ];

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className={style.main}>
      <WebSocketComponent/>
      <UserInfo id={ids[0]}/>
      <div className={style.list}>
        {messages.map((msg) => {
          if (msg.id === "zerohch0") {
            // 내 메시지면
            return (
              <div
                key={msg.messageId}
                className={cx(style.message, style.myMessage)}
              >
                <div className={style.content}>{msg.content}</div>
                <div className={style.date}>
                  {dayjs(msg.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
                </div>
              </div>
            );
          }
          return (
            <div
              key={msg.messageId}
              className={cx(style.message, style.yourMessage)}
            >
              <div className={style.content}>{msg.content}</div>
              <div className={style.date}>
                {dayjs(msg.createdAt).format("YYYY년 MM월 DD일 A HH시 mm분")}
              </div>
            </div>
          );
        })}
      </div>
      <MessageForm id={ids[0]}/>
    </main>
    </HydrationBoundary>
  );
}

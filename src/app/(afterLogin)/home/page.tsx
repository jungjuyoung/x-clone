import { Suspense } from "react";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";
import Loading from "./loading";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import { auth } from '@/auth';
import { Metadata } from 'next';

export const metadata:Metadata = {
  title: '홈 | X.com',
  description: 'X.com 클론코딩 홈'
}

const Home = async () => {
  const session = await auth()
  
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session}/>
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
};

export default Home;

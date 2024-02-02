import { Suspense } from "react";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";
import Loading from "./loading";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";

const Home = async () => {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
};

export default Home;

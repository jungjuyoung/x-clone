"use client";
import { useState } from "react";
import style from "./tab.module.css";

export default function Tab() {
  const [tab, setTab] = useState("recommend");
  const onClickRecommend = () => {
    setTab("recommend");
  };
  const onClickFollowing = () => {
    setTab("following");
  };
  // console.log('tab',tab);
  return (
    <div className={style.homeFixed}>
      <div className={style.homeText}>홈</div>
      <div className={style.homeTab}>
        <div
          className={`${tab === "recommend" ? style.on : ""}`}
          onClick={onClickRecommend}
        >
          추천
        </div>
        <div
          className={`${tab === "following" ? style.on : ""}`}
          onClick={onClickFollowing}
        >
          팔로우중
        </div>
      </div>
    </div>
  );
}

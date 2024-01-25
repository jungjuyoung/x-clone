"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Trend from "./Trend";
import style from "./trendSection.module.css";
import { useSession } from "next-auth/react";
import { getTrends } from "../_lib/getTrends";
import { HashTag } from "@/model/HashTag";

export default function TrendSection() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const { data } = useQuery<HashTag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000, // fresh -> stale, 기본값이 0. 5분이라는 기준
    gcTime: 300 * 1000, // 기본 5분 설정
    enabled: !!session?.user,
  });

  if (pathname === "/explore") return null;
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트랜드</h3>
          {/* Trend 서버에서 받아와서 돌림 */}
          {data?.map<HashTag>((trend) => (
            <Trend key={trend.tagId} trend={trend} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className={style.trendBg}>
      <div className={style.noTrend}>트랜드를 가져올 수 없습니다.</div>
    </div>
  );
}

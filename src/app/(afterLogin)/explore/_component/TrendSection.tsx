"use client";

import Trend from "@/app/(afterLogin)/_component/Trend";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Hashtag } from "@/model/HashTag";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";

export default function TrendSection() {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Hashtag[]>(["trends"]);
  // const { data } = useQuery<HashTag[]>({
  //   queryKey: ["trends"],
  //   queryFn: getTrends,
  //   staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
  //   gcTime: 300 * 1000,
  // });
  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}

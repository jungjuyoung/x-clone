import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import ImageZone from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/ImageZone";
import style from "./photoModal.module.css";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import UsePreventScroll from "@/app/(afterLogin)/_component/UsePreventScroll";

type Props = {
  params: { id: string };
};
export default async function Default({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
    initialPageParam: 0,
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <div className={style.container}>
      <UsePreventScroll />
      <HydrationBoundary state={dehydrateState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <div>
            <Comments id={id} />
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
}

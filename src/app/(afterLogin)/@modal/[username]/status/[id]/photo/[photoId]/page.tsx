import Post from "@/app/(afterLogin)/_component/Post";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import ImageZone from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/ImageZone";
import style from "./photoModal.module.css";
import { faker } from "@faker-js/faker";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";

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
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydrateState = dehydrate(queryClient);
  return (
    <div className={style.container}>
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

import Link from "next/link";
import style from "@/app/(afterLogin)/_component/post.module.css";
import cx from "classnames";

type Props = {
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
};

const renderImages = (post:Props['post'] ) => {
  const imageLinks = post.Images.map((image, index) => (
    <Link
      key={index}
      href={`/${post.User.id}/status/${post.postId}/photo/${image.imageId}`}
      style={{
        backgroundImage: `url(${image.link})`,
        backgroundSize: "cover",
      }}
    ></Link>
  ));

  console.log(`cx(postImageSection${post.Images.length})`)

  return (
    <div className={cx(style.postImageSection, style[`postImageSection${post.Images.length}`])}>
      {imageLinks}
    </div>
  );
};

export default function PostImages({ post }: Props) {
  if (!post.Images || !post.Images.length) return null;

  return renderImages(post);
}
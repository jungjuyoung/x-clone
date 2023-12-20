import { NextPage } from "next";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <div>
      <div>이 페이지는 존재하지 않습니다. 다른 페이지를 검색하세요.</div>
      <Link href="/search">검색</Link>
    </div>
  );
};
export default NotFoundPage;

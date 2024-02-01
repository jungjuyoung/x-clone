import Home from "@/app/(afterLogin)/home/page";

type Props = {
  params: { username: string; id: string; photoId: string };
};
export default function Page({ params }: Props) {
  // console.log("params: ", params); // params:  { username: 'elonmusk', id: '1', photoId: '1' }
  params.username; // elonmusk
  params.id; // 1
  params.photoId; // 1
  return <Home />;
}

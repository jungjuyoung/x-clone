export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>home layout </div> <div> {children}</div>
    </div>
  );
}

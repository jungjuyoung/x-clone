export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      (afterLogin) layout
      <div>{children}</div>
    </div>
  );
}

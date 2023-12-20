export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>root layout</div>
        {children}
      </body>
    </html>
  );
}

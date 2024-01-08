import { MSWCompnent } from "./_component/MSWComponent";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MSWCompnent />
        {children}
      </body>
    </html>
  );
}

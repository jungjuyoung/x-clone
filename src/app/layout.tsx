import AuthContext from "./_component/AuthContext";
import { MSWComponent } from "./_component/MSWComponent";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MSWComponent />
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}

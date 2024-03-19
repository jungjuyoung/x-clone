import { Metadata } from 'next';
import AuthContext from "./_component/AuthContext";
import { MSWComponent } from "./_component/MSWComponent";
import "./global.css";

export const metadata:Metadata={
  title: 'X.com 무슨일이 일어나고 있나요?',
  description: 'X.com 클론코딩'
}
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

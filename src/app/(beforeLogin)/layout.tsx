import style from "@/app/page.module.css";

export default function BeforeLoginLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className={style.container}>
      <div>(beforeLogin) layout</div>
      {children}
      {modal}
    </div>
  );
}

// 주소가 localhost:3000 일때 children => page.tsx, modal => @modal/default.tsx
// 주소가 localhost:3000/i/flow/login 일때 children => i/flow/login/page.tsx, modal => @modal/i/flow/login/page.tsx

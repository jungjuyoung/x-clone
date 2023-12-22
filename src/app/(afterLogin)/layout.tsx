import style from "@/app/(afterLogin)/layout.module.css";
import Image from "next/image";
import Link from "next/link";
import zlogo from "../../../public/zlogo.png";
export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href="/home">
              <div className={style.logoPill}>
                <Image src={zlogo} alt="z.com로고" width={40} height={40} />
              </div>
            </Link>
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          <main className={style.main}>{children}</main>
          <section className={style.rightSection}>
            <form className={style.search}></form>
          </section>
        </div>
      </div>
    </div>
  );
}

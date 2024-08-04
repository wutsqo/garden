import dynamic from "next/dynamic";
import s from "./footer.module.css";

const Mondrian = dynamic(() => import("@components/mondrian"), {
  ssr: false,
});

export default function Footer() {
  return (
    <footer className={s.wrapper}>
      <div className={s.mondrianWrapper}>
        <Mondrian keyPrefix="footer" />
      </div>
      <div className={s.innerWrapper}>
        <div>THE PERSONAL SITE & PORTFOLIO • </div>
        <div>MUHAMMAD URWATIL WUTSQO</div>
      </div>
    </footer>
  );
}

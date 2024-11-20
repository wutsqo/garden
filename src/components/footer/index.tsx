import s from "./index.module.css";
import Mondrian from "@components/mondrian";

export default function Footer() {
  return (
    <footer className={s.wrapper}>
      <div className={s.mondrianWrapper}>
        <Mondrian keyPrefix="footer" />
      </div>
      <div className={s.innerWrapper}>
        <div className="flex items-center gap-2 h-12">
          <div className="text-4xl -ml-3">✷</div>
          <div>
            <div>THE PERSONAL SITE & PORTFOLIO • WUTSQO</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Mondrian from "@components/mondrian";

export default function Footer() {
  return (
    <footer className="relative h-96 w-full bg-black text-white">
      <div className="absolute -top-4 left-0 h-full w-full">
        <Mondrian keyPrefix="footer" />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-end p-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex h-12 items-center gap-2">
          <div className="-ml-3 text-4xl">✷</div>
          <div>
            <div>THE PERSONAL SITE & PORTFOLIO • WUTSQO</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

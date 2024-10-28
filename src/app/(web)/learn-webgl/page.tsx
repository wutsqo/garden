import ColorfulTriangle from "./day-0/colorful-triangle";

export default function LearnWebglPage() {
  return (
    <div className={"w-screen min-h-screen pt-20 bg-black text-white"}>
      <div className="container">
        <h1>WebGL Learning Journal</h1>
        <div className="border-t border-white my-4"></div>
        <div className={"my-4"}>
          <div className="flex flex-col sm:flex-row justify-between items-baseline">
            <h2>0. Colorful Triangle</h2>
            <p>Oct 28, 2024</p>
          </div>
          <div className={"border-t border-white my-2 flex justify-center"}>
            <ColorfulTriangle />
          </div>
        </div>
      </div>
    </div>
  );
}

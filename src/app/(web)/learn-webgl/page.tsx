import ColorfulTriangle from "./day-0/colorful-triangle";

export default function LearnWebglPage() {
  return (
    <div className={"min-h-screen w-screen bg-black pt-20 text-white"}>
      <div className="container mx-auto px-6">
        <h1>WebGL Learning Journal</h1>
        <div className="my-4 border-t border-white"></div>
        <div className={"my-4"}>
          <div className="flex flex-col items-baseline justify-between sm:flex-row">
            <h2>0. Colorful Triangle</h2>
            <p>Oct 28, 2024</p>
          </div>
          <div className={"my-2 flex justify-center border-t border-white"}>
            <ColorfulTriangle />
          </div>
        </div>
      </div>
    </div>
  );
}

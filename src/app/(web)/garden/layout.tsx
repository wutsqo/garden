export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="pt-16 container bg-white border-x min-h-screen">
      {children}
    </div>
  );
}

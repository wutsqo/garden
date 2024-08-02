export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto container p-4 pt-32">
      <main>{children}</main>
    </div>
  );
}

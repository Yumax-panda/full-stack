export default async function Layout({
  children,
}: {
  children: React.ReactNode
  params: { userId: string }
}) {
  return <div>{children}</div>
}

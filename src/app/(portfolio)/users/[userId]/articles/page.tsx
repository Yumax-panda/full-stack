export default function Article({
  params: { userId },
}: {
  params: { userId: string }
}) {
  return (
    <div>
      <h1>Article</h1>
      <p>{userId}</p>
    </div>
  )
}

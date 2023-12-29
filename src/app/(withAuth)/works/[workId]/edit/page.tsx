import { Editor } from './_components/Editor/Editor'

export default function Edit({
  params: { workId },
}: {
  params: { workId: string }
}) {
  return <Editor workId={workId} />
}

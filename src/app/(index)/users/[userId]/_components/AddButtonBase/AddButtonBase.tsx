import { AddButton } from '@/app/_components/AddButton'

type Props = Parameters<typeof AddButton>[0]

export const AddButtonBase = (props: Props) => (
  <div style={{ position: 'fixed', bottom: '2vh', left: '2vw' }}>
    <AddButton {...props} />
  </div>
)

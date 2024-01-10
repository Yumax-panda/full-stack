import { useRouter } from 'next/navigation'

import { CloseOutlined, SaveAsOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

type ButtonWithIconProps = {
  icon: any
  text: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const ButtonWithIcon = ({ icon, text, onClick, type }: ButtonWithIconProps) => (
  <ListItem disablePadding>
    <ListItemButton onClick={onClick} type={type} component='button'>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  </ListItem>
)

type Props = {
  isPrivate: boolean
  toggleIsPrivate: () => void
}

const ToggleIsPrivateButon = ({ isPrivate, toggleIsPrivate }: Props) => (
  <Button
    onClick={toggleIsPrivate}
    variant='outlined'
    sx={{ border: 'none', whiteSpace: 'nowrap', mx: '1rem' }}
  >
    {isPrivate ? '非公開' : '公開'}
  </Button>
)

export const Header = (props: Props) => {
  const router = useRouter()

  return (
    <nav
      style={{
        backgroundColor: 'inherit',
        marginBottom: '2rem',
        position: 'sticky',
        top: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 1rem',
        }}
      >
        <List sx={{ display: 'flex' }}>
          <ButtonWithIcon
            icon={<CloseOutlined />}
            text='戻る'
            onClick={router.back}
          />
        </List>
        <List sx={{ display: 'flex' }}>
          <ToggleIsPrivateButon {...props} />
          <ButtonWithIcon icon={<SaveAsOutlined />} text='保存' type='submit' />
        </List>
      </Box>
    </nav>
  )
}

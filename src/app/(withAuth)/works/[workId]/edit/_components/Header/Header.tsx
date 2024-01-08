import { useRouter } from 'next/navigation'

import { CloseOutlined, SaveAsOutlined } from '@mui/icons-material'
import {
  AppBar,
  Box,
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
      <ListItemText
        primary={text}
        sx={{
          '& .MuiListItemText-root': {
            color: 'black',
          },
        }}
      />
    </ListItemButton>
  </ListItem>
)

export const Header = () => {
  const router = useRouter()

  return (
    <AppBar
      position='sticky'
      sx={{ backgroundColor: 'inherit', marginBottom: '2rem' }}
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
          <ButtonWithIcon icon={<SaveAsOutlined />} text='保存' type='submit' />
        </List>
      </Box>
    </AppBar>
  )
}

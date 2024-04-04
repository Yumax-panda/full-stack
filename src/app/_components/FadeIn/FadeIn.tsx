import styles from './FadeIn.module.css'

type Props = {
  children: React.ReactNode
}

export const FadeIn = ({ children }: Props) => (
  <div className={styles.fadeIn}>{children}</div>
)

import styles from '../MainScreen.module.css';

type Props = {
  name: string;
  buzzerClass: string;
  handleClick: () => void
};

export const Buzzer = ({ name, buzzerClass, handleClick }: Props) => {
  return (
    <div className={buzzerClass}>
      <button onClick={handleClick} className={styles.circle}>{name}</button>
    </div>
)};
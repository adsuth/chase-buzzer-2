import { useAtom } from 'jotai';
import { chasersAtom, playersAtom } from '../../../../atoms';

import styles from '../MainScreen.module.css';

type Props = {
  type: "PLAYERS" | "CHASERS";
};

export const UserList = ({ type }: Props) => {
  const [users] = useAtom(type === "PLAYERS" ? playersAtom : chasersAtom);
  
  return (
    <div className={styles.userContainer}>
      <div className={styles.userHeader}>{type}:</div>
      <div className={styles.userNames}>
        {users.map((user) =>
          <div key={user.id} className={styles.user}>
          <div className={styles.buzzerIcon} />
            {user.name + (user.pass ? "IDK" : "")}
          </div>
        )}
      </div>
    </div>
)};
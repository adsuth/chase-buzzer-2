import { User } from '../types';

import styles from '../MainScreen.module.css';

type Props = {
  type: "PLAYERS" | "CHASERS";
  users: User[];
};

export const UserList = ({ type, users }: Props) => {
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
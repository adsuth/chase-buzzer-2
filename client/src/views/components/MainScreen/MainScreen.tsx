import { useState } from 'react';
import { User } from './types';
import { Buzzer, UserList } from '.';

import styles from './MainScreen.module.css';

type Props = {
  players: User[];
  chasers: User[];
};

export const MainScreen = ({ players, chasers }: Props) => {
  const [buzzer, setBuzzer] = useState<string>("");

  const handleBuzz = () => {
    if (players.length === 0 || chasers.length === 0) { return; }
    setBuzzer(players[0].name);
  };

  const handlePass = () => {
    // setPlayers()
  }

  const idkButtonText = 
    <p className={styles.idkButtonText}>
      Click the buzzer above or press spacebar to buzz in.<br />
      You can only buzz in on your team's turn.<br />
      Click the button below to let your team know you are willing to pass.<br />
      You can also do this by pressing the I, D or K key.
    </p>

  return (<>
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <UserList type="PLAYERS" users={players} />
        <Buzzer name="BUZZ" buzzerClass={styles.buzzerContainer} handleClick={handleBuzz} />
        <UserList type="CHASERS" users={chasers} />
      </div>
      <div className={styles.buzzName}>
        {buzzer || <span>&nbsp;</span>}
      </div>
      {idkButtonText}
      <Buzzer name="IDK" buzzerClass={styles.idkButtonContainer} handleClick={handlePass} />
    </div>
  </>)
};
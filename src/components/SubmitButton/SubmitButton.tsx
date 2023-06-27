import * as React from 'react';
import { FC, ReactElement } from 'react';

import styles from '@/components/SubmitButton/submit-button.module.sass';

const SubmitButton: FC = (): ReactElement => {
  return <button className={styles.button}>Submit</button>;
};

export default SubmitButton;

import * as React from 'react';
import { FC, ReactElement, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

import styles from '@/components/Wrapper/wrapper.module.sass';
import { FormFieldsEnum } from '@/constants/constants';

type PropsType = {
  id: FormFieldsEnum;
  title: string;
  children: ReactNode;
  error?: FieldError;
};

const Wrapper: FC<PropsType> = ({ id, title, children, error }): ReactElement => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{title}</label>
      {children}
      {error && <p className={styles.wrapper__error}>{error.message}</p>}
    </div>
  );
};

export default Wrapper;

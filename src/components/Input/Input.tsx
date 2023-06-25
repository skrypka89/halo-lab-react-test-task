import * as React from 'react';
import { FC, ReactElement } from 'react';
import { UseFormRegister } from 'react-hook-form';

import styles from '@/components/Input/input.module.sass';
import { FormFieldsEnum, placeholders } from '@/constants/constants';
import { FormFieldsType } from '@/types/types';

type PropsType = {
  id: FormFieldsEnum;
  register: UseFormRegister<FormFieldsType>;
};

const Input: FC<PropsType> = ({ id, register }): ReactElement => {
  return (
    <input
      type="text"
      className={styles.input}
      id={id}
      placeholder={placeholders[id]}
      {...register(id)}
    />
  );
};

export default Input;

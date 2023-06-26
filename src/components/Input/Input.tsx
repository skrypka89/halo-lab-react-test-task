import * as React from 'react';
import { FC, ReactElement } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import styles from '@/components/Input/input.module.sass';
import Wrapper from '@/components/Wrapper/Wrapper';
import { FormFieldsEnum, placeholders } from '@/constants/constants';
import { FormFieldsType } from '@/types/types';

type PropsType = {
  id: FormFieldsEnum;
  title: string;
  register: UseFormRegister<FormFieldsType>;
  error?: FieldError;
};

const Input: FC<PropsType> = ({ id, title, register, error }): ReactElement => {
  return (
    <Wrapper id={id} title={title} error={error}>
      <input
        type="text"
        className={styles.input}
        id={id}
        placeholder={placeholders[id]}
        {...register(id)}
      />
    </Wrapper>
  );
};

export default Input;

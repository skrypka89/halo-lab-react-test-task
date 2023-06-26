import * as React from 'react';
import { FC, ReactElement } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import styles from '@/components/Select/select.module.sass';
import Wrapper from '@/components/Wrapper/Wrapper';
import { FormFieldsEnum } from '@/constants/constants';
import { FormFieldsType, SelectOptionsType } from '@/types/types';

type PropsType = {
  id: FormFieldsEnum;
  title: string;
  options?: Partial<SelectOptionsType>[];
  register: UseFormRegister<FormFieldsType>;
  error?: FieldError;
};

const Select: FC<PropsType> = ({
  id,
  title,
  options = [],
  register,
  error,
}): ReactElement => {
  return (
    <Wrapper id={id} title={title} error={error}>
      <select id={id} className={styles.select} {...register(id)}>
        <option value="">{`Select ${title}`}</option>
        {options.map((opt: Partial<SelectOptionsType>) => (
          <option value={opt.value} key={opt.id}>
            {opt.value}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};

export default Select;

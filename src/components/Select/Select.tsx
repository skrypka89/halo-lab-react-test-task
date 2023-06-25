import * as React from 'react';
import { FC, ReactElement } from 'react';
import { UseFormRegister } from 'react-hook-form';

import styles from '@/components/Select/select.module.sass';
import { FormFieldsEnum } from '@/constants/constants';
import { FormFieldsType, SelectOptionsType } from '@/types/types';

type PropsType = {
  id: FormFieldsEnum;
  options?: Partial<SelectOptionsType>[];
  register: UseFormRegister<FormFieldsType>;
};

const Select: FC<PropsType> = ({
  id,
  options = [],
  register,
}): ReactElement => {
  return (
    <select id={id} className={styles.select} {...register(id)}>
      <option value=""></option>
      {options.map((opt: Partial<SelectOptionsType>) => (
        <option value={opt.value} key={opt.id}>
          {opt.value}
        </option>
      ))}
    </select>
  );
};

export default Select;

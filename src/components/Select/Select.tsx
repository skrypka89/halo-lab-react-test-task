import * as React from 'react';
import { FC, ReactElement } from 'react';
import { FieldError, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import styles from '@/components/Select/select.module.sass';
import Wrapper from '@/components/Wrapper/Wrapper';
import { FormFieldsEnum } from '@/constants/constants';
import { FormFieldsType, SelectOptionsType } from '@/types/types';

type PropsType = {
  id: FormFieldsEnum;
  title: string;
  options?: SelectOptionsType[];
  register: UseFormRegister<FormFieldsType>;
  setValue: UseFormSetValue<FormFieldsType>;
  error?: FieldError;
};

const Select: FC<PropsType> = ({
  id,
  title,
  options = [],
  register,
  setValue,
  error,
}): ReactElement => {
  const selectRegister =
    id === FormFieldsEnum.CITY || id === FormFieldsEnum.DOCTOR_SPECIALITY
      ? (id: FormFieldsEnum) =>
          register(id, {
            onChange: e => {
              setValue(id, e.target.value);
              setValue(FormFieldsEnum.DOCTOR, '');
            },
          })
      : register;

  return (
    <Wrapper id={id} title={title} error={error}>
      <select
        id={id}
        className={`${styles.select} ${error && styles.select__error}`}
        {...selectRegister(id)}
      >
        <option value="">{`Select ${title}`}</option>
        {options.map((opt: Partial<SelectOptionsType>) => (
          <option key={opt.id} value={opt.value}>
            {opt.value}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};

export default Select;

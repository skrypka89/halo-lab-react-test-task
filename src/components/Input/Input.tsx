import * as React from 'react';
import { FC, ReactElement, useEffect } from 'react';
import {
  FieldError,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import styles from '@/components/Input/input.module.sass';
import Wrapper from '@/components/Wrapper/Wrapper';
import { FormFieldsEnum, placeholders } from '@/constants/constants';
import { FormFieldsType } from '@/types/types';
import { getEmailOrPhoneField } from '@/utils/utils';

type PropsType = {
  id: FormFieldsEnum;
  title: string;
  register: UseFormRegister<FormFieldsType>;
  getValues: UseFormGetValues<FormFieldsType>;
  setValue: UseFormSetValue<FormFieldsType>;
  clearErrors: UseFormClearErrors<FormFieldsType>;
  error?: FieldError;
};

const Input: FC<PropsType> = ({
  id,
  title,
  register,
  getValues,
  setValue,
  clearErrors,
  error,
}): ReactElement => {
  useEffect(() => {
    if (
      (id === FormFieldsEnum.EMAIL || id === FormFieldsEnum.MOBILE_NUMBER) &&
      getValues(getEmailOrPhoneField(id)) &&
      error?.message === 'Enter at least phone number or email'
    ) {
      clearErrors(id);
    }
  });

  const handleFocus = () => {
    if (
      id === FormFieldsEnum.MOBILE_NUMBER &&
      !getValues(FormFieldsEnum.MOBILE_NUMBER).includes('+380')
    ) {
      setValue(id, '+380');
    }
  };

  return (
    <Wrapper id={id} title={title} error={error}>
      <input
        type="text"
        className={`${styles.input} ${error && styles.input__error}`}
        id={id}
        placeholder={placeholders[id]}
        onFocus={handleFocus}
        {...register(id)}
      />
    </Wrapper>
  );
};

export default Input;

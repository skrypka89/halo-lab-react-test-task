import * as React from 'react';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormFieldsEnum, FormFieldsType } from '@/types';

const formFields = Object.values(FormFieldsEnum);
const formInitialValues = {} as FormFieldsType;
formFields.forEach(v => (formInitialValues[v] = ''));

const Form: FC = (): ReactElement => {
  const [, setState] = useState(formInitialValues);
  const { reset, watch, handleSubmit } = useForm<FormFieldsType>({
    defaultValues: { ...formInitialValues },
  });

  const onSubmit = (data: FormFieldsType) => {
    console.log(data);
    setState({ ...formInitialValues });
    reset({ ...formInitialValues });
  };

  const handleChange = () => {
    const currentData = watch();
    setState({ ...currentData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}></form>
  );
};

export default Form;

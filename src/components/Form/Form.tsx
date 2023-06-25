import * as React from 'react';
import { FC, Fragment, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { FormFieldsEnum, placeholders } from '@/constants/constants';
import { FormFieldsType } from '@/types/types';

const formFields = Object.values(FormFieldsEnum);
const formInitialValues = {} as FormFieldsType;
formFields.forEach(field => (formInitialValues[field] = ''));

const Form: FC = (): ReactElement => {
  const [, setFormValues] = useState(formInitialValues);
  const { reset, watch, handleSubmit, register } = useForm<FormFieldsType>({
    defaultValues: { ...formInitialValues },
  });

  const onSubmit = (data: FormFieldsType) => {
    console.log(data);
    setFormValues({ ...formInitialValues });
    reset({ ...formInitialValues });
  };

  const handleChange = () => {
    const currentValues = watch();
    setFormValues({ ...currentValues });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      {formFields.map(field => (
        <Fragment key={field}>
          {placeholders[field] ? (
            <Input id={field} register={register} />
          ) : (
            <Select id={field} register={register} />
          )}
        </Fragment>
      ))}
      <SubmitButton />
    </form>
  );
};

export default Form;

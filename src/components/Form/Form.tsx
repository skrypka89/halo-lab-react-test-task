import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, Fragment, ReactElement, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';

import styles from '@/components/Form/form.module.sass';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { FormFieldsEnum, placeholders } from '@/constants/constants';
import useFormFetch from '@/hooks/useFormFetch';
import useFormFilter from '@/hooks/useFormFilter';
import { FormFetchType, FormFieldsType, FormFilterType, SelectedFormFields } from '@/types/types';
import { getTitle } from '@/utils/utils';
import { schema } from '@/validation/schema';

const formInitialValues = {} as FormFieldsType;
Object.values(FormFieldsEnum).forEach(field => (formInitialValues[field] = ''));

const Form: FC = (): ReactElement => {
  const fetchedData: FormFetchType = useFormFetch();
  const [formValues, setFormValues] = useState(formInitialValues);
  const {
    reset,
    watch,
    handleSubmit,
    register,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormFieldsType>({
    defaultValues: { ...formInitialValues },
    resolver: yupResolver(schema) as Resolver<FormFieldsType>,
  });
  const options: FormFilterType = useFormFilter(fetchedData, formValues, setValue);

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
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} onChange={handleChange}>
      {Object.entries(FormFieldsEnum).map(([key, field]) => {
        const title = getTitle(key);
        return (
          <Fragment key={field}>
            {placeholders[field] ? (
              <Input
                id={field}
                title={title}
                register={register}
                getValues={getValues}
                setValue={setValue}
                clearErrors={clearErrors}
                error={errors[field]}
              />
            ) : (
              <Select
                id={field}
                title={title}
                options={options[field as FormFieldsEnum.SEX | SelectedFormFields]}
                register={register}
                setValue={setValue}
                error={errors[field]}
              />
            )}
          </Fragment>
        );
      })}
      <SubmitButton />
    </form>
  );
};

export default Form;

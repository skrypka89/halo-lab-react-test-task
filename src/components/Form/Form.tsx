import * as React from 'react';
import { FC, Fragment, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { FormFieldsEnum, placeholders } from '@/constants/constants';
import useFormFetch from '@/hooks/useFormFetch';
import useFormFilter from '@/hooks/useFormFilter';
import { FormFetchType, FormFieldsType, FormFilterType } from '@/types/types';
import { getTitle } from '@/utils/utils';

const formInitialValues = {} as FormFieldsType;
Object.values(FormFieldsEnum).forEach(field => (formInitialValues[field] = ''));

const Form: FC = (): ReactElement => {
  const fetchedData: FormFetchType = useFormFetch();
  const options: FormFilterType = useFormFilter(fetchedData);
  const [, setFormValues] = useState(formInitialValues);
  const {
    reset,
    watch,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFieldsType>({
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
      {Object.entries(FormFieldsEnum).map(([key, field]) => {
        const title = getTitle(key);
        return (
          <Fragment key={field}>
            {placeholders[field] ? (
              <Input
                id={field}
                title={title}
                register={register}
                error={errors[field]}
              />
            ) : (
              <Select
                id={field}
                title={title}
                options={options[field]}
                register={register}
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

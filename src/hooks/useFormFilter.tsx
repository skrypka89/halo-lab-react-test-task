import { useMemo } from 'react';

import { FormFieldsEnum, sexOptions } from '@/constants/constants';
import {
  FetchedDataType,
  FormFetchType,
  FormFilterType,
  SelectOptionsType,
} from '@/types/types';

export default function useFormFilter(data: FormFetchType): FormFilterType {
  const filteredOptions = useMemo(() => {
    const options = {
      [FormFieldsEnum.SEX]: sexOptions,
      [FormFieldsEnum.CITY]: [],
      [FormFieldsEnum.DOCTOR_SPECIALITY]: [],
      [FormFieldsEnum.DOCTOR]: [],
    } as FormFilterType;
    (Object.entries(data) as [FormFieldsEnum, FetchedDataType[]][]).forEach(
      ([field, fetched]) => {
        const selected = options[field] as SelectOptionsType[];
        fetched.forEach(({ id, name, surname }) => {
          selected.push({
            id,
            value:
              field !== FormFieldsEnum.DOCTOR ? name : name + ' ' + surname,
          });
        });
      }
    );
    return options;
  }, [data]);

  return filteredOptions;
}

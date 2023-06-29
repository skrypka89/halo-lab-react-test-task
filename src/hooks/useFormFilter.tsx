import { useMemo } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { FormFieldsEnum } from '@/constants/constants';
import { FormFetchType, FormFieldsType, FormFilterType } from '@/types/types';
import {
  changeOptions,
  filterByBirthday,
  filterByDoctor,
  filterDoctors,
  getInitialDoctorsList,
  getInitialOptions,
} from '@/utils/formFilterUtils';

export default function useFormFilter(
  data: FormFetchType,
  formValues: FormFieldsType,
  setValue: UseFormSetValue<FormFieldsType>
): FormFilterType {
  const options = useMemo(() => {
    const initialOptions = getInitialOptions(data);
    let doctors = getInitialDoctorsList(data);
    doctors = filterByBirthday(doctors, formValues[FormFieldsEnum.BIRTHDAY_DATE]);
    doctors = filterDoctors(doctors, formValues, 'CITY');
    doctors = filterDoctors(doctors, formValues, 'SEX');
    doctors = filterDoctors(doctors, formValues, 'DOCTOR_SPECIALITY');
    if (formValues[FormFieldsEnum.DOCTOR]) {
      const {
        sex,
        city,
        speciality,
        doctors: filteredDoctors,
      } = filterByDoctor(doctors, formValues[FormFieldsEnum.DOCTOR]);
      doctors = filteredDoctors;
      if (sex) {
        setValue(FormFieldsEnum.SEX, sex);
      }
      setValue(FormFieldsEnum.CITY, city);
      setValue(FormFieldsEnum.DOCTOR_SPECIALITY, speciality);
    }
    return changeOptions(initialOptions, formValues, doctors);
  }, [data, formValues, setValue]);

  return options;
}

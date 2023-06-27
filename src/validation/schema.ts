import * as yup from 'yup';

import { FormFieldsEnum } from '@/constants/constants';
import { patterns } from '@/validation/patterns';
import {
  checkBirthdayDate,
  checkFormat,
  checkIfRequired,
} from '@/validation/utils';

export const schema = yup.object().shape({
  [FormFieldsEnum.NAME]: yup
    .string()
    .required("Field 'Name' is required")
    .matches(
      patterns[FormFieldsEnum.NAME] as RegExp,
      "Field 'Name' must not contain numbers"
    ),

  [FormFieldsEnum.BIRTHDAY_DATE]: yup
    .string()
    .required("Field 'Birthday' is required")
    .matches(
      patterns[FormFieldsEnum.BIRTHDAY_DATE] as RegExp,
      'Date format must be DD/MM/YYYY'
    )
    .test(FormFieldsEnum.BIRTHDAY_DATE, 'Invalid date', checkBirthdayDate),

  [FormFieldsEnum.SEX]: yup.string().required("Field 'Sex' is required"),

  [FormFieldsEnum.CITY]: yup.string().required("Field 'City' is required"),

  [FormFieldsEnum.DOCTOR]: yup.string().required("Field 'Doctor' is required"),

  [FormFieldsEnum.EMAIL]: yup
    .string()
    .test(
      FormFieldsEnum.EMAIL,
      'Enter at least phone number or email',
      checkIfRequired(FormFieldsEnum.EMAIL)
    )
    .test(
      FormFieldsEnum.EMAIL,
      'Invalid email',
      checkFormat(FormFieldsEnum.EMAIL)
    ),

  [FormFieldsEnum.MOBILE_NUMBER]: yup
    .string()
    .test(
      FormFieldsEnum.MOBILE_NUMBER,
      'Enter at least phone number or email',
      checkIfRequired(FormFieldsEnum.MOBILE_NUMBER)
    )
    .test(
      FormFieldsEnum.MOBILE_NUMBER,
      'Phone format must be +380XXXXXXXXX',
      checkFormat(FormFieldsEnum.MOBILE_NUMBER)
    ),
});

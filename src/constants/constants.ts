import { FormFieldsType, SelectOptionsType } from '@/types/types';

export enum FormFieldsEnum {
  NAME = 'name',
  BIRTHDAY_DATE = 'birthday',
  SEX = 'sex',
  CITY = 'city',
  DOCTOR_SPECIALITY = 'speciality',
  DOCTOR = 'doctor',
  EMAIL = 'email',
  MOBILE_NUMBER = 'phone',
}

export const placeholders: Partial<FormFieldsType> = {
  [FormFieldsEnum.NAME]: 'Please enter your name',
  [FormFieldsEnum.BIRTHDAY_DATE]: 'DD/MM/YYYY',
  [FormFieldsEnum.EMAIL]: 'example@email.com',
  [FormFieldsEnum.MOBILE_NUMBER]: '+380ХХХХХХХХХ',
};

export const urls: Partial<FormFieldsType> = {
  [FormFieldsEnum.CITY]:
    'https://run.mocky.io/v3/9fcb58ca-d3dd-424b-873b-dd3c76f000f4',
  [FormFieldsEnum.DOCTOR_SPECIALITY]:
    'https://run.mocky.io/v3/e8897b19-46a0-4124-8454-0938225ee9ca',
  [FormFieldsEnum.DOCTOR]:
    'https://run.mocky.io/v3/3d1c993c-cd8e-44c3-b1cb-585222859c21',
};

export const sexOptions: SelectOptionsType[] = [
  { id: '1', value: 'Male' },
  { id: '2', value: 'Female' },
];

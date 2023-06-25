import { FormFieldsType } from '@/types/types';

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
  [FormFieldsEnum.BIRTHDAY_DATE]: 'dd/mm/yyyy',
  [FormFieldsEnum.EMAIL]: 'example@email.com',
  [FormFieldsEnum.MOBILE_NUMBER]: '+380ХХХХХХХХХ',
};

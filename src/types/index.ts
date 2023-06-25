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

export type FormFieldsType = Record<FormFieldsEnum, string>;

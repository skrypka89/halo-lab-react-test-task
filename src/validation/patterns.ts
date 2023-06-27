import { FormFieldsEnum } from '@/constants/constants';

export const patterns: Partial<Record<FormFieldsEnum, RegExp>> = {
  [FormFieldsEnum.NAME]: /^[^\d]+$/,
  [FormFieldsEnum.BIRTHDAY_DATE]: /^\d{2}\/\d{2}\/\d{4}$/,
  [FormFieldsEnum.EMAIL]:
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  [FormFieldsEnum.MOBILE_NUMBER]: /^\+380\d{9}$/,
};

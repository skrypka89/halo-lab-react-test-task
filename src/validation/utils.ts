import * as yup from 'yup';

import { FormFieldsEnum } from '@/constants/constants';
import { getEmailOrPhoneField } from '@/utils/utils';
import { patterns } from '@/validation/patterns';

export function checkBirthdayDate(value: string): boolean {
  const [day, month, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    year > 1900 &&
    Date.now() > date.getTime()
  );
}

export function checkIfRequired(
  field: FormFieldsEnum.EMAIL | FormFieldsEnum.MOBILE_NUMBER
) {
  return (value: string | undefined, context: yup.TestContext<yup.AnyObject>) =>
    !!context.parent[getEmailOrPhoneField(field)] || !!value;
}

export function checkFormat(field: FormFieldsEnum) {
  return (value: string | undefined) =>
    value ? (patterns[field] as RegExp).test(value) : true;
}

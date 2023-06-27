import { FormFieldsEnum } from '@/constants/constants';

export function getTitle(str: string): string {
  return str
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getEmailOrPhoneField(
  field: FormFieldsEnum.EMAIL | FormFieldsEnum.MOBILE_NUMBER
): FormFieldsEnum.EMAIL | FormFieldsEnum.MOBILE_NUMBER {
  if (field === FormFieldsEnum.EMAIL) {
    return FormFieldsEnum.MOBILE_NUMBER;
  }
  return FormFieldsEnum.EMAIL;
}

import { FormFieldsEnum } from '@/constants/constants';

export type FormFieldsType = Record<FormFieldsEnum, string>;

export type SelectOptionsType = {
  id: string;
  value: string;
};

export type FormFilterType = Partial<
  Record<FormFieldsEnum, SelectOptionsType[]>
>;

export type FetchedDataType = {
  id: string;
  name: string;
  surname: string;
  specialtyId: string;
  isPediatrician: boolean;
  cityId: string;
  params: {
    minAge: string;
    maxAge: string;
    gender: string;
  };
};

export type FormFetchType = Partial<Record<FormFieldsEnum, FetchedDataType[]>>;

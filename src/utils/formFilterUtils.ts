import { FetchedDataEnum, FormFieldsEnum, sexOptions } from '@/constants/constants';
import {
  DoctorsListType,
  FetchedDataType,
  FormFetchType,
  FormFieldsType,
  FormFilterType,
  SelectOptionsType,
} from '@/types/types';
import { patterns } from '@/validation/patterns';
import { checkBirthdayDate } from '@/validation/utils';

export function getInitialOptions(data: FormFetchType): FormFilterType {
  const options = {
    [FormFieldsEnum.SEX]: sexOptions,
    [FormFieldsEnum.CITY]: [],
    [FormFieldsEnum.DOCTOR_SPECIALITY]: [],
    [FormFieldsEnum.DOCTOR]: [],
  } as FormFilterType;
  (Object.entries(data) as Array<[keyof FormFilterType, FetchedDataType[]]>).forEach(
    ([field, fetchedValues]) => {
      fetchedValues.forEach(fetched => {
        options[field].push({
          id: fetched[FetchedDataEnum.ID],
          value:
            field !== FormFieldsEnum.DOCTOR
              ? fetched[FetchedDataEnum.NAME]
              : fetched[FetchedDataEnum.NAME] + ' ' + fetched[FetchedDataEnum.SURNAME],
        });
      });
    }
  );
  return options;
}

export function getInitialDoctorsList(data: FormFetchType): DoctorsListType {
  return data[FormFieldsEnum.DOCTOR]?.map((doctor: FetchedDataType) => {
    const speciality = data[FormFieldsEnum.DOCTOR_SPECIALITY].find(
      spec => spec.id === doctor[FetchedDataEnum.DOCTOR_SPECIALITY]
    );
    const city = data[FormFieldsEnum.CITY].find(c => c.id === doctor[FetchedDataEnum.CITY]);
    return {
      ...doctor,
      [FetchedDataEnum.DOCTOR_SPECIALITY]: speciality?.[FetchedDataEnum.NAME] ?? '',
      [FetchedDataEnum.CITY]: city?.[FetchedDataEnum.NAME] ?? '',
      [FetchedDataEnum.PARAMETERS]: speciality?.[FetchedDataEnum.PARAMETERS],
      disabled: false,
    };
  });
}

function calculateAge(value: string): number {
  const [day, month, year] = value.split('/').map(Number);
  const birthday = new Date(year, month - 1, day);
  return Math.abs(new Date(Date.now() - birthday.getTime()).getUTCFullYear() - 1970);
}

export function filterByBirthday(doctors: DoctorsListType, formValue: string): DoctorsListType {
  if (
    !formValue ||
    !patterns[FormFieldsEnum.BIRTHDAY_DATE]?.test(formValue) ||
    !checkBirthdayDate(formValue)
  ) {
    return doctors;
  }
  return doctors?.map(doctor => {
    const age = calculateAge(formValue);
    const isPediatrician = doctor[FetchedDataEnum.IS_PEDIATRICIAN];
    const minAge = doctor[FetchedDataEnum.PARAMETERS]?.[FetchedDataEnum.MIN_AGE];
    const maxAge = doctor[FetchedDataEnum.PARAMETERS]?.[FetchedDataEnum.MAX_AGE];
    if (
      ((isPediatrician && age < 18) || (!isPediatrician && age >= 18)) &&
      ((!minAge && !maxAge) || (minAge && age >= +minAge) || (maxAge && age <= +maxAge))
    ) {
      doctor.disabled = false;
    } else {
      doctor.disabled = true;
    }
    return doctor;
  });
}

export function filterDoctors(
  doctors: DoctorsListType,
  formValues: FormFieldsType,
  field: 'SEX' | 'CITY' | 'DOCTOR_SPECIALITY'
): DoctorsListType {
  const formValue = formValues[FormFieldsEnum[field]];
  if (!formValue) {
    return doctors;
  }
  return doctors?.map(doctor => {
    if (doctor.disabled) {
      return doctor;
    }
    if (field === 'CITY' || field === 'DOCTOR_SPECIALITY') {
      doctor.disabled = doctor[FetchedDataEnum[field]] !== formValue;
    } else {
      const gender = doctor[FetchedDataEnum.PARAMETERS]?.[FetchedDataEnum.GENDER];
      if (gender) {
        doctor.disabled = gender !== formValue;
      }
    }
    return doctor;
  });
}

export function filterByDoctor(doctors: DoctorsListType, formValue: string) {
  const [name, surname] = formValue.split(' ');
  const doctor = doctors.find(
    doc => doc[FetchedDataEnum.NAME] === name && doc[FetchedDataEnum.SURNAME] === surname
  ) as FetchedDataType & { disabled: boolean };
  return {
    sex: doctor[FetchedDataEnum.PARAMETERS]?.[FetchedDataEnum.GENDER] ?? '',
    city: doctor[FetchedDataEnum.CITY],
    speciality: doctor[FetchedDataEnum.DOCTOR_SPECIALITY],
    doctors,
  };
}

export function changeOptions(
  options: FormFilterType,
  formValues: FormFieldsType,
  doctors: DoctorsListType
): FormFilterType {
  if (!doctors?.find(doctor => doctor.disabled)) {
    return options;
  }
  if (!formValues[FormFieldsEnum.SEX]) {
    if (!doctors.find(doctor => !doctor.disabled)) {
      options[FormFieldsEnum.SEX] = [];
    } else {
      doctors?.every(doctor => {
        if (doctor.disabled) {
          return true;
        }
        const params = doctor[FetchedDataEnum.PARAMETERS];
        const gender = params?.[FetchedDataEnum.GENDER];
        const sexOpts = options[FormFieldsEnum.SEX];
        if (!params || !gender) {
          options[FormFieldsEnum.SEX] = sexOptions;
          return false;
        } else if (sexOpts.length !== 1) {
          options[FormFieldsEnum.SEX] = [];
          options[FormFieldsEnum.SEX].push(
            sexOptions.find(opt => opt.value === gender) as SelectOptionsType
          );
          return true;
        } else if (sexOpts[0].value !== gender) {
          sexOpts.push(sexOptions.find(opt => opt.value === gender) as SelectOptionsType);
          return false;
        }
      });
    }
  }
  const changeCityOrSpecialityOptions = (key: 'CITY' | 'DOCTOR_SPECIALITY') => {
    if (!formValues[FormFieldsEnum[key]]) {
      options[FormFieldsEnum[key]].forEach(opt => {
        const filtered = doctors
          .filter(doctor => doctor[FetchedDataEnum[key]] === opt.value)
          .find(doctor => doctor.disabled === false);
        if (!filtered) {
          opt.value = '';
        }
      });
      options[FormFieldsEnum[key]] = options[FormFieldsEnum[key]].filter(opt => opt.value !== '');
    }
  };
  changeCityOrSpecialityOptions('CITY');
  changeCityOrSpecialityOptions('DOCTOR_SPECIALITY');
  doctors?.forEach(doctor => {
    if (doctor.disabled) {
      const index = options[FormFieldsEnum.DOCTOR].findIndex(
        opt => opt.value === doctor[FetchedDataEnum.NAME] + ' ' + doctor[FetchedDataEnum.SURNAME]
      );
      if (!formValues[FormFieldsEnum.DOCTOR] && ~index) {
        options[FormFieldsEnum.DOCTOR].splice(index, 1);
      }
    }
  });
  return options;
}

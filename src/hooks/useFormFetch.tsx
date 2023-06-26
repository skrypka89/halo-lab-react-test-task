import { useEffect, useState } from 'react';

import { FormFieldsEnum, urls } from '@/constants/constants';
import { FetchedDataType, FormFetchType } from '@/types/types';

export default function useFormFetch(): FormFetchType {
  const [data, setData] = useState<FormFetchType>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses: { [key in FormFieldsEnum]?: FetchedDataType[] }[] =
          await Promise.all(
            (Object.entries(urls) as [FormFieldsEnum, string][]).map(
              async ([field, url]) => {
                const response = await fetch(url).then(res => res.json());
                return { [field]: response as FormFetchType[] };
              }
            )
          );
        setData(Object.assign({}, ...responses) as FormFetchType);
      } catch {
        setData({});
      }
    };
    fetchData();
  }, []);

  return data;
}

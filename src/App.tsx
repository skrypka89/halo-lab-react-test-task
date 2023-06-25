import * as React from 'react';
import { FC, ReactElement } from 'react';

import '@/App.css';
import Form from '@/components/Form/Form';

const App: FC = (): ReactElement => {
  return (
    <main>
      <Form />
    </main>
  );
};

export default App;

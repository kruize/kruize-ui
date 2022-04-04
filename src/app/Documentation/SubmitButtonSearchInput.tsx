import React from 'react';
import { SearchInput } from '@patternfly/react-core';

SubmitButtonSearchInput = () => {
  const [value, setValue] = React.useState('');

  return (
    <SearchInput
      placeholder='Find by name'
      value={value}
      onChange={setValue}
      onSearch={setValue}
      onClear={() => setValue('')}
    />
  );
}
export function SubmitButtonSearchInput() ;

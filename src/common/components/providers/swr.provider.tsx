'use client';

import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

export const SwrProvider = ({ children }: PropsWithChildren) => {
  return (
    <SWRConfig
      value={{
        onError: (err) => {
          // TODO: Add error handling for SWR
          console.log(err);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

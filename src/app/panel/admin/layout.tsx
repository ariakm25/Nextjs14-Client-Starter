'use client';

import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

export default function LayouPanelAdmin({ children }: PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        onError: (err) => {
          console.log(err);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}

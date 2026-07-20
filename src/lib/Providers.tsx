'use client';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/redux/store';
import ProviderContent from '@/redux/ProviderContent';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProviderContent>
      <PersistGate loading={
          <div className="flex items-center justify-center h-screen w-screen">
            loading...
          </div>
        } persistor={persistor}>
        {children}
      </PersistGate>
    </ProviderContent>
  );
}
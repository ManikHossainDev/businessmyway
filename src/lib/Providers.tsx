'use client';


import ProviderContent from '@/redux/ProviderContent';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProviderContent>
      {children}
    </ProviderContent>
  );
}
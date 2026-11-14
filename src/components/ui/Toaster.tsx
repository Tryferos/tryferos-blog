'use client';

import { Toast, ToastRegion, ToastTitle } from '@ui-sdk/react/toast';

export function Toaster() {
  return (
    <ToastRegion data-agent-hidden>
      {() => (
        <Toast>
          <ToastTitle />
        </Toast>
      )}
    </ToastRegion>
  );
}

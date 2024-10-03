'use client';

import React from 'react';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

export default function CustomToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'none',
          boxShadow: 'none',
        },
        success: {
          icon: <FaCheckCircle />,
        },
        error: {
          icon: <FaExclamationCircle />,
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t} key={t.id}>
          {({ icon, message }) => (
            <>
              <div className={`alert alert-${t.type} drop-shadow flex`}>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button onClick={() => toast.dismiss(t.id)}>
                    <FaXmark />
                  </button>
                )}
              </div>
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

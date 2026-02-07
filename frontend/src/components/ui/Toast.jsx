import React from 'react';
import { Toaster } from 'react-hot-toast';

export const Toast = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#fff',
                    color: '#333',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                },
                success: {
                    iconTheme: {
                        primary: '#f43f5e',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
};

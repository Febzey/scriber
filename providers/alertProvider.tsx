"use client";

import React, { useState, useContext } from 'react';
import { FaTimes } from 'react-icons/fa';

type AlertType = 'error' | 'success' | 'info';

interface Alert {
    type: AlertType;
    title: string;
    text: string;
    timeout: number
}

interface AlertContextProps {
    showAlert: (args: Alert) => void;
}

const AlertContext = React.createContext<AlertContextProps>({
    showAlert: () => { },
});

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

function AlertProvider({ children }: { children: React.ReactNode }) {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    const showAlert = (args: Alert) => {
        const { timeout } = args;
        setAlerts([...alerts, args]);

        setTimeout(() => { removeAlert(args) }, timeout)
    };

    const removeAlert = (alert: Alert) => {
        setAlerts(alerts.filter((a) => a !== alert));
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            {
                alerts.map((alert, index) => (
                    <div className="absolute flex-col w-full inset-0 py-12 flex justify-end items-center min-h-screen">
                        <div className="bg-orange-100 lg:w-1/3 lg:max-w-1/3 break-words fixed w-[95%] mx-auto border-l-4 border-orange-500 text-orange-700 p-4" role="alert">

                            <div className="w-full h-full relative">
                                <button onClick={() => removeAlert(alert)} className="top-0 bottom-0 right-4 absolute text-xl"><FaTimes /></button>

                                <div className="w-3/4">
                                <p className="font-bold">{alert.title}</p>
                                <p>{alert.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </AlertContext.Provider>
    );
};

export default AlertProvider;

import React, { createContext, useContext, useState, useCallback } from "react";
import { TaskAlert } from "@/components/task-alert";

const AlertContext = createContext({
  showAlert: () => {},
  hideAlert: () => {}
});

export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((type, message, duration) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, type, message, duration }]);
    return id;
  }, []);

  const hideAlert = useCallback(id => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alerts.map(alert => (
        <TaskAlert
          key={alert.id}
          type={alert.type}
          message={alert.message}
          duration={alert.duration}
          onDismiss={() => hideAlert(alert.id)}
        />
      ))}
    </AlertContext.Provider>
  );
}

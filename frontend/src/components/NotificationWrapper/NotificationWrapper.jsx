import React, { useEffect } from 'react';
import { useToaster } from 'rsuite';

const NotificationWrapper = ({ type, children }) => {
  const toaster = useToaster();

  useEffect(() => {
    showNotification(type, children);
  }, [type, children]); // Chamamos showNotification sempre que type ou children mudar

  const showNotification = (messageType, content) => {
    if (messageType === 'error') {
      toaster.error(Message());
    } else {
      toaster.success(content);
    }
  };

  // O componente NotificationWrapper não precisa retornar nada, pois ele apenas exibe notificações
  return null;
};

export default NotificationWrapper;

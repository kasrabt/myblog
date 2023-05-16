import { createContext, useEffect, useState } from "react";
const NotificationContext = createContext({
  notification: null,
  showNotification: (Notif) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  const [activeNotif, setActivnotif] = useState();
  useEffect(() => {
    if (
      activeNotif &&
      (activeNotif.status === "error" || activeNotif.status === "success")
    ) {
      const timer = setTimeout(() => {
        setActivnotif(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotif]);
  const showNotificationHanlder = (Notif) => {
    setActivnotif(Notif);
  };

  const HideNotificationHandler = () => {
    setActivnotif(null);
  };
  const context = {
    showNotification: showNotificationHanlder,
    hideNotification: HideNotificationHandler,
    notification: activeNotif,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;

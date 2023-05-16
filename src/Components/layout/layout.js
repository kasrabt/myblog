import NotificationContext from "@/store/NotificationCtx";
import { Fragment, useContext } from "react";
import Notification from "../ui/notification";
import MainHeader from "./main-header";

function Layout(props) {
  const NotifCtx = useContext(NotificationContext);
  const ActiveNotif = NotifCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {ActiveNotif && (
        <Notification
          title={ActiveNotif.title}
          status={ActiveNotif.status}
          message={ActiveNotif.message}
        />
      )}
    </Fragment>
  );
}

export default Layout;

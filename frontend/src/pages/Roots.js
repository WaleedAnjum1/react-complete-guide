
import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

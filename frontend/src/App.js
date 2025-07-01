import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AuthPage from "./Components/auth/AuthPage";
import RouteGuard from "./Components/route-guard";
import ForgotPage from "./Components/auth/ForgotPage";
import Order from "./Components/Order";
import ReturnCan from "./Components/ReturnCan";
import Report from "./Components/Report";
import Pending from "./Components/Pending";
import PageNotFound from "./Components/PageNotFound";
import "./Styles/MBLCardData.css";

import ActiveCans from "./Components/ActiveCans";
import { AuthContext } from "./context/AuthContext";
import { ActiveCansContext } from "./context/ActiveCansContext";
import ItemTimeLine from "./Components/ItemTimeLine";

function App() {

  const { auth } = useContext(AuthContext);
  const { targetItemNo } = useContext(ActiveCansContext);
  console.log("auth ", auth)


  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
          />
        }
      />

      <Route path="/forgot" element={<RouteGuard element={<ForgotPage/>}/>} />
      <Route path={`/`} exact element={<HomePage auth={auth}/>} />
      <Route path={`/home`} exact element={<HomePage auth={auth} />} />
      <Route path={`/active-items`} exact element={<ActiveCans/>} />
      <Route path={`/history/item/${targetItemNo}`} exact element={<ItemTimeLine/>} />
      <Route
        path={`/order`}
        element={
          <RouteGuard
            element={<Order />}
          />
        }
      />
      <Route
        path={`/returncan/:id`}
        element={
          <RouteGuard
            element={<ReturnCan />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path={`/report/:id`}
        element={
          <RouteGuard
            element={<Report />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path={`/pending`}
        element={
          <RouteGuard
            element={<Pending />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;

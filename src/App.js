import "./App.css";
import TopBarComponent from "./components/Topbar/TopBarComponent";
import LoginPage from "./pages/login/LoginPage";
import { BrowserRouter, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import NotFoundPage from "./pages/NotFoundPage";
import ForbidenPage from "./pages/ForbidenPage";
import { configureInterceptors } from "./services/HttpService";
import {
  adminGuard,
  loginGuard,
  superuserGuard,
} from "./services/AuthorizationGuardService";
import UsersPage from "./pages/users/UsersPage";
import ProdUserPage from "./pages/prod-user/prodUserPage/ProdUsersPage";
import NavbarComponent from "./components/Navbar/NavbarComponent";
import UserDetailsPage from "./pages/users/UserDetailsPage";
import RegisterPage from "./pages/register/RegisterPage";
import React from "react";
import ProdUserDetailsPage from "pages/prod-user/prodUserDetailsPage/ProdUserDetailsPage";
import ProductPage from "pages/product/productPage/ProductPage";
import ProductDetailsPage from "pages/product/productDetailsPage/ProductDetailsPage";
import LinePage from "pages/line/linesPage/LinePage";
import LineDetailsPage from "pages/line/lineDetailsPage/LineDetailsPage";
import AdminPanelLinePage from "pages/admin-panel/lines/AdminPanelLinePage";
import AdminPanelPage from "pages/admin-panel/AdminPanelPage";
import AdminPanelLineModifyPage from "pages/admin-panel/lines/AdminPanelLineModifyPage";
import AdminPanelLineAdd from "pages/admin-panel/lines/AdminPanelLineAdd";
import ReportListPage from "pages/report/reportsListPage/ReportsListPage";
import ReportDetailsPage from "pages/report/reportDetailsPage/ReportDetailsPage";
import QualityControlDetailsPage from "pages/quality-control/qualityControlDetailsPage/QualityControlDetailsPage";
import QualityControlListPage from "pages/quality-control/qualityControlListPage/QualityControlListPage";
import DowntimeDetailsPage from "pages/downtimes/DowntimeDetailsPage/DowntimeDetailsPage";
import DowntimesListPage from "pages/downtimes/DowntimesListPage/DowntimeListPage";
import BreakdownDetailsPage from "pages/breakdowns/BreakdownDetailsPage/BreakdownDetailsPage";
import BreakdownListPage from "pages/breakdowns/BreakdownListPage/BreakdownListPage";
import MaterialDetailsPage from "pages/materials/MaterialDetailsPage";
function App() {
  configureInterceptors();

  return (
    <BrowserRouter>
      <div
        className="App"
        // @ts-ignore
        style={appStyle}
      >
        <TopBarComponent />
        <NavbarComponent />
        <GuardProvider guards={[loginGuard, adminGuard, superuserGuard]}>
          <Switch>
            <GuardedRoute path="/login" exact component={() => <LoginPage />} />
            <GuardedRoute
              path="/"
              exact
              meta={{ authorization: true }}
              component={() => <LinePage />}
            />
            <GuardedRoute
              path="/users"
              exact
              meta={{ authorization: true, admin: true }}
              component={() => <UsersPage />}
            />
            <GuardedRoute
              path="/user-details/:userId"
              exact
              meta={{ authorization: true, admin: true }}
              component={() => <UserDetailsPage />}
            />
            <GuardedRoute
              path="/prod-users"
              exact
              meta={{ authorization: true, superuser: true }}
              component={() => <ProdUserPage />}
            />
            <GuardedRoute
              path="/prod-user-details/:id"
              exact
              meta={{ authorization: true, superuser: true }}
              component={() => <ProdUserDetailsPage />}
            />
            <GuardedRoute
              path="/products"
              exact
              meta={{ authorization: true }}
              component={() => <ProductPage />}
            />
            <GuardedRoute
              path="/product-details/:id"
              exact
              meta={{ authorization: true }}
              component={() => <ProductDetailsPage />}
            />
            <GuardedRoute
              path="/line-details/:id"
              exact
              meta={{ authorization: true }}
              component={() => <LineDetailsPage />}
            />
            <GuardedRoute
              path="/reports/:query"
              exact
              meta={{ authorization: true }}
              component={() => <ReportListPage />}
            />

            <GuardedRoute
              path="/report-details/:reportId"
              exact
              meta={{ authorization: true }}
              component={() => <ReportDetailsPage />}
            />

            <GuardedRoute
              path="/downtime-details/:id"
              exact
              meta={{ authorization: true }}
              component={() => <DowntimeDetailsPage />}
            />

            <GuardedRoute
              path="/downtimes-list/:query"
              exact
              meta={{ authorization: true }}
              component={() => <DowntimesListPage />}
            />

            <GuardedRoute
              path="/quality-control-details/:qualityControlId"
              exact
              meta={{ authorization: true }}
              component={() => <QualityControlDetailsPage />}
            />

            <GuardedRoute
              path="/quality-controls/:query"
              exact
              meta={{ authorization: true }}
              component={() => <QualityControlListPage />}
            />

            <GuardedRoute
              path="/breakdowns-list/:query"
              exact
              meta={{ authorization: true }}
              component={() => <BreakdownListPage />}
            />

            <GuardedRoute
              path="/breakdown/:id"
              exact
              meta={{ authorization: true }}
              component={() => <BreakdownDetailsPage />}
            />

            <GuardedRoute
              path="/material/:id"
              exact
              meta={{ authorization: true }}
              component={() => <MaterialDetailsPage />}
            />

            <GuardedRoute
              path="/admin-panel"
              exact
              meta={{ authorization: true, superuser: true }}
              component={() => <AdminPanelPage />}
            />

            <GuardedRoute
              path="/admin-panel-lines"
              exact
              meta={{ authorization: true, superuser: true }}
              component={() => <AdminPanelLinePage />}
            />

            <GuardedRoute
              path="/admin-panel-modify-lines/:id"
              exact
              meta={{ authorization: true, superuser: true }}
              component={() => <AdminPanelLineModifyPage />}
            />

            <GuardedRoute
              path="/admin-panel-add-line"
              exact
              meta={{ authorization: true, admin: true }}
              component={() => <AdminPanelLineAdd />}
            />
            <GuardedRoute
              path="/register"
              exact
              component={() => <RegisterPage />}
            />
            <GuardedRoute path="/forbiden" exact component={ForbidenPage} />
            <GuardedRoute path="*" component={NotFoundPage} />
          </Switch>
        </GuardProvider>
      </div>
    </BrowserRouter>
  );
}

const appStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
export default App;

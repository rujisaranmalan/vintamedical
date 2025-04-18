import { Route, Routes as Switch, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { FC } from "react";
import HomePage from "./HomePage";
import Login from "./Login";
import StartCase from "./StartCase";
import ContinueCase from "./ContinueCase";
import CompleteCase from "./CompleteCase";
import SubmitCase from "./SubmitCase";
import Logout from "./Logout";
import HistoryTable from "./HistoryTable";
import HistoryCase from "./HistoryCase";

const ProtectedRoute: FC<{ outlet: React.ReactNode }> = ({ outlet }) => {
  const token = localStorage.getItem("ownerId");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return outlet;
};

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      {/* <Route path="/auth/callback" element={<AuthCallback />} /> */}

      {/* Protected routes as a group */}
      <Route element={<ProtectedRoute outlet={<MainLayout />} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/start-case" element={<StartCase />} />
        <Route path="/continue-case/:caseId" element={<ContinueCase />} />
        <Route path="/complete-case/:caseId" element={<CompleteCase />} />
        <Route path="/submit-case/:caseId" element={<SubmitCase />} />

        <Route path="/history" element={<HistoryTable />} />
        <Route path="/history/case/:caseId" element={<HistoryCase />} />
      </Route>
    </Switch>
  );
};

export default Routes;

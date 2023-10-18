import {
  createBrowserRouter
} from "react-router-dom";

import Layout from './components/layout'

import Dashboard from "./components/pages/dashboard";

import ProjectDashboard from "./components/pages/projects/dashboard.project";
import ProjectsList from "./components/pages/projects/list.project";
import ProjectCreate from "./components/pages/projects/create.project";
import ProjectEdit from "./components/pages/projects/edit.project";

import MSADashboard from "./components/pages/msa/dashboard.msa";
import MSAList from "./components/pages/msa/list.msa";
import MSACreate from "./components/pages/msa/create.msa";
import MSAEdit from "./components/pages/msa/edit.msa";

import SOWDashboard from "./components/pages/sow/dashboard.sow";
import SOWList from "./components/pages/sow/list.sow";
import SOWCreate from "./components/pages/sow/create.sow";
import SOWEdit from "./components/pages/sow/edit.sow";

import TimesheetDashboard from "./components/pages/timesheet/dashboard.timesheet";
import TimesheetList from "./components/pages/timesheet/list.timesheet";
import TimesheetCreate from "./components/pages/timesheet/create.timesheet";
import TimesheetEdit from "./components/pages/timesheet/edit.timesheet";

import InvoiceDashboard from "./components/pages/invoice/dashboard.invoice";
import InvoiceList from "./components/pages/invoice/list.invoice";
import InvoiceCreate from "./components/pages/invoice/create.invoice";
import InvoiceEdit from "./components/pages/invoice/edit.invoice";
import Settings from "./components/pages/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "settings",
        element: <Settings />,
      },

      /** Project routes */
      {
        path: "projects",
        element: <ProjectsList />,
      },
      {
        path: "projects/dashboard/:projectId",
        element: <ProjectDashboard />,
      },
      {
        path: "projects/create",
        element: <ProjectCreate />,
      },
      {
        path: "projects/edit/:projectId",
        element: <ProjectEdit />,
      },

      /** MSA routes */
      {
        path: "msa",
        element: <MSAList />,
      },
      {
        path: "msa/dashboard",
        element: <MSADashboard />,
      },
      {
        path: "msa/create",
        element: <MSACreate />,
      },
      {
        path: "msa/edit/:msaId",
        element: <MSAEdit />,
      },

      /** SOW routes */
      {
        path: "sow",
        element: <SOWList />,
      },
      {
        path: "sow/dashboard",
        element: <SOWDashboard />,
      },
      {
        path: "sow/create",
        element: <SOWCreate />,
      },
      {
        path: "sow/edit/:sowId",
        element: <SOWEdit />,
      },

      /** Timesheet routes */
      {
        path: "timesheet",
        element: <TimesheetList />,
      },
      {
        path: "timesheet/dashboard",
        element: <TimesheetDashboard />,
      },
      {
        path: "timesheet/create",
        element: <TimesheetCreate />,
      },
      {
        path: "timesheet/edit/:timesheetId",
        element: <TimesheetEdit />,
      },

      /** Invoice routes */
      {
        path: "invoice",
        element: <InvoiceList />,
      },
      {
        path: "invoice/dashboard",
        element: <InvoiceDashboard />,
      },
      {
        path: "invoice/create",
        element: <InvoiceCreate />,
      },
      {
        path: "invoice/edit/:invoiceId",
        element: <InvoiceEdit />,
      },
    ],
  },
]);
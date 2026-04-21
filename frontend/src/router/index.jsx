import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Layout from "../Layouts/Layout";
import GuestLayout from "../Layouts/GuestLayout";
import Login from "../pages/login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import StudentDashboardLayout from "../Layouts/StudentDashboardLayout";
import StudentDashboard from "../components/Student/StudentDashboard";
import AdminDashboard from "../components/Admin/AdminDashboard";
import ManageParents from "../components/Admin/ManageParents";
import AdminDashboardLayout from "../Layouts/AdminDashboardLayout";
import ParentDashboardLayout from "../Layouts/ParentDashboardLayout";
import ManageStudents from "../components/Admin/ManageStudents";

export const LOGIN_ROUTE = "/login";

const ADMIN_BASE_ROUTE = "/admin";
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE + "/dashboard";
export const ADMIN_MANAGE_PARENTS_ROUTE = ADMIN_BASE_ROUTE + "/manage-parents";
export const ADMIN_MANAGE_STUDENTS_ROUTE =
    ADMIN_BASE_ROUTE + "/manage-students";
export const STUDENT_DASHBOARD_ROUTE = "/student/dashboard";
export const PARENT_DASHBOARD_ROUTE = "/parent/dashboard";

// export const TEACHER_DASHBOARD_ROUTE = "/admin/dashboard";
export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },

            {
                path: "/register",
                element: <Register />,
            },

            {
                path: "/users",
                element: <Users />,
            },

            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        element: <GuestLayout />,
        children: [
            {
                path: LOGIN_ROUTE,
                element: <Login />,
            },
        ],
    },
    {
        element: <StudentDashboardLayout />,
        children: [
            {
                path: STUDENT_DASHBOARD_ROUTE,
                element: <StudentDashboard />,
            },
        ],
    },

    {
        element: <AdminDashboardLayout />,
        children: [
            {
                path: ADMIN_DASHBOARD_ROUTE,
                element: <AdminDashboard />,
            },
            {
                path: ADMIN_MANAGE_PARENTS_ROUTE,
                element: <ManageParents />,
            },

            {
                path: ADMIN_MANAGE_STUDENTS_ROUTE,
                element: <ManageStudents />,
            },
        ],
    },

    {
        element: <ParentDashboardLayout />,
        children: [
            {
                path: PARENT_DASHBOARD_ROUTE,
                element: <AdminDashboard />,
            },
        ],
    },
]);

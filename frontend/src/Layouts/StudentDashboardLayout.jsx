import {   Link , Outlet, useNavigate} from "react-router-dom"
import {LOGIN_ROUTE, STUDENT_DASHBOARD_ROUTE} from "../router/index"
import { useEffect } from "react"
import {useUserContext} from "../context/StudentContext.jsx";
import StudentApi from "../services/Api/Student/StudentApi.js";
import { Button } from "../components/ui/button.jsx";
import StudentDropDownMenu from "./StudentDropdownMenu.jsx"
import StudentAdminstrationSideBar from "./Adminstration/StudentAdminstrationSidebar.jsx"

import { Gauge } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle.jsx";


export default function StudentDashboardLayout() {
  const navigate = useNavigate()

   const {setUser,setAuthenticated, logout,authenticated} = useUserContext()

 useEffect(() => {
  if (!authenticated) {
    navigate(LOGIN_ROUTE);
    return;
  }
  StudentApi.getUser().then(({ data }) => {
    setUser(data);
    setAuthenticated(true)
  }).catch(() => {
    navigate(LOGIN_ROUTE);
   });
 }, []);

 const logoutCallback = async () =>{
  StudentApi.logout().then(()=>{
    logout()
    navigate(LOGIN_ROUTE)
  })
 }

  return (
    <>  
      <header>
  <hr />
         <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
          Logo  {authenticated }
        </div>

           <div> 
          <ul className="flex text-white">
            <li className="ml-5 px-2 py-1">
              <Link className="" to={STUDENT_DASHBOARD_ROUTE}> <Gauge className="{mx-1}"/>Dashboard</Link>
            </li>

            <li className="ml-5 px-2 py-1">
              <Button onClick={logoutCallback}>Logout</Button>
            </li>

       

            <li className="ml-5 px-2 py-1">
              <Link className="" to={'/users'}> users</Link>
            </li>
            <li className="ml-5 px-2 py-1">
            <StudentDropDownMenu/>
            </li>

            <li className="ml-5 px-2 py-1">
            <ModeToggle/>
            </li>
          </ul>
        </div>
      </div>

       



      </header>
      <main className="container">
       <div className="flex">
        <div className="w-100 md:w1/4">
          <StudentAdminstrationSideBar/>
        </div>

         <div className="w-100 md:w-3/4">
         <h1>Hi student</h1>
          <Outlet/>
        </div>
       </div>
      </main>
      

      <footer>Footer</footer>
    </>
  )
}


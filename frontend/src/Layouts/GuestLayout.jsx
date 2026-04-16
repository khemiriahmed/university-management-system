import { Outlet , Link , useNavigate } from "react-router-dom"
import { useEffect } from "react"
import {STUDENT_DASHBOARD_ROUTE} from "../router/index"
import {useUserContext} from "../context/StudentContext.jsx"
export default function GuestLayout() {

    const navigate = useNavigate()
    const context = useUserContext()
  useEffect( ()=>{
    if (context.authenticated){
    navigate(STUDENT_DASHBOARD_ROUTE)
  }
  },[])
  return (
    <>  
      <header>

         <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
          Logo
        </div>

           <div>
          <ul className="flex text-white">
            <li className="ml-5 px-2 py-1">
              <Link className="" to={'/'}> Home page</Link>
            </li>

            <li className="ml-5 px-2 py-1">
              <Link className="" to={'/login'}> Login</Link>
            </li>

            <li className="ml-5 px-2 py-1">
              <Link className="" to={'/register'}> Register</Link>
            </li>

            <li className="ml-5 px-2 py-1">
              <Link className="" to={'/users'}> users</Link>
            </li>
            <li className="ml-5 px-2 py-1">
             
            </li>
          </ul>
        </div>
      </div>

       



      </header>
      <main  className={'container  '}>
        <Outlet/>
      </main>
      <footer>Footer</footer>
    </>
  )
}


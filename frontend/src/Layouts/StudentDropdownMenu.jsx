import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuItem,DropdownMenuSeparator } from '../components/ui/dropdown-menu.jsx'
import {Button} from '../components/ui/button.jsx'
import {  useNavigate} from "react-router-dom"
import {useUserContext} from "../context/StudentContext.jsx";
import StudentApi from "../services/Api/Student/StudentApi.js";
import {LOGIN_ROUTE} from "../router/index"
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
export default function StudentDropDownMenu(){
  const navigate = useNavigate()
   const { logout,user} = useUserContext()
   const logoutCallback = async () =>{
  StudentApi.logout().then(()=>{
    logout()
    navigate(LOGIN_ROUTE)
  })
 }
    return <>
 <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button> <UserIcon className="mr-2" /> {user.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <UserIcon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCardIcon />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logoutCallback} variant="destructive">
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    </>
}
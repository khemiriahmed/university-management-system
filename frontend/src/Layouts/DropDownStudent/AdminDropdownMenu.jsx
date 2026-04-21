import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/StudentContext.jsx";
import StudentApi from "../../services/Api/Student/UserApi.js";
import { LOGIN_ROUTE } from "../../router/index";
import {
    CreditCardIcon,
    LogOutIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react";
import DefaultDropDownMenu from "./defaultDropdownMenu.jsx";
export default function AdminDropDownMenu() {
    return (
        <>
            <DefaultDropDownMenu></DefaultDropDownMenu>
        </>
    );
}

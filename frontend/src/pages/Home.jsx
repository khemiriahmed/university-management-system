import { useContext } from "react";
import { useUserContext } from "../context/StudentContext.jsx";

export default function Home() {
    const context = useUserContext();
    return (
        <>
            {context.user.name}
            Hi from Home page
        </>
    );
}

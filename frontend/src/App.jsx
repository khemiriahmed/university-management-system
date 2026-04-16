
import UserContext from './context/StudentContext.jsx'
import './App.css'
import {router} from "./router/index.jsx"
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster.jsx"
function App() {


  return (
    <>
    
     <UserContext>

       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <RouterProvider router={router}/>
    
    </ThemeProvider>

     </UserContext>
     <Toaster/>
  
     </>
  )
}

export default App

import {createContext, useState, useContext,useEffect} from 'react';
import StudentApi from '../services/Api/Student/UserApi';



export const StudentStateContext = createContext({
    user:{},
    authenticated:false,
    setUser:() => {},
    logout:() => {},
    setAuthenticated:() => {},
    login:(email,password) => {},
});

export default function UserContext({children}){
    const [user,setUser] = useState({})
    const [authenticated,setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      StudentApi.getUser()
        .then(({ data }) => {
          setUser(data);
          setAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);



    const login = async (email,password) => {
        return StudentApi.login(email,password)
    }


const logout = () => {
  localStorage.removeItem("token");
  setAuthenticated(false);
  setUser({});
};

if (loading) return <div>Loading...</div>;
    return <>
          <StudentStateContext.Provider value={
            {
                user,
                login,
                authenticated,
                setUser,
                setAuthenticated,
                logout
            }
          }>
            {children}
          </StudentStateContext.Provider>
          </>
}

export  const useUserContext = () => useContext(StudentStateContext)
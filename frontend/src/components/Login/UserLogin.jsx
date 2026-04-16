import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form.jsx";
import { Input } from "../ui/input.jsx";
import { Button } from "../ui/button.jsx";
import { axiosClient } from "../../api/axios.js";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { STUDENT_DASHBOARD_ROUTE } from "../../router/index.jsx";
import { ADMIN_DASHBOARD_ROUTE } from "../../router/index.jsx";
import { useUserContext } from "../../context/StudentContext.jsx";

const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(30),
});

export default function UserLogin() {
  const navigate = useNavigate();
  const { login, setAuthenticated } = useUserContext();
  const form = useForm({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   email: 'ahmed@test.com',
    //   password: '123456789'
    // }
  });

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    await login(values.email, values.password).then
    (({data,status}) => {
        // Sauvegarder le token

        if(status === 200){
            setAuthenticated(true);
            console.log(data)
               localStorage.setItem("token", data.token);
            
              
                switch(data.role){
                  case 'student':
                   navigate(STUDENT_DASHBOARD_ROUTE);
                   break;
                   

                    case 'admin':
                   navigate(ADMIN_DASHBOARD_ROUTE);
                   break;
                
                  }
                   
                  

        }
       
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Login failed";
        setError("email", { message });
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader className="mx-2 my-2 animate-spin" />} Login
        </Button>
      </form>
    </Form>
  );
}

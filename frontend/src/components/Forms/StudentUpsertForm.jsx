import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.jsx";
import {Input} from "../ui/input.jsx";
import {Button} from "../ui/button.jsx";
import {Loader} from "lucide-react";
import {RadioGroup, RadioGroupItem} from "../ui/radio-group.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.jsx";
import {Textarea} from "../ui/textarea.jsx";
import { useNavigate } from "react-router-dom";
import { ADMIN_DASHBOARD_ROUTE } from "../../router/index.jsx";
import { useEffect, useState } from "react";
import ParentApi from "../../services/Api/ParentApi.js";

const formSchema = z.object({
  firstname: z.string().min(1, "First name is required").max(50),
  lastname: z.string().min(1, "Last name is required").max(50),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required").max(1),
  blood_type: z.string().min(1, "Blood type is required"),
  student_parent_id: z.string().min(1, " required").max(10),
  email: z.string().email("Invalid email").min(2).max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(30)
})

export default function StudentUpsertForm({handleSubmit, values}) {
  const navigate = useNavigate();
  const [parents, setParents] = useState([])
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: values || {
      firstname: "",
      lastname: "",
      date_of_birth: "",
      gender: "",
      blood_type: "",
      student_parent_id: "",
      email: "",
      password: ""
    }
  })
  
  const {setError, formState: {isSubmitting}, reset} = form
 
  useEffect(() => {
   ParentApi.all(['id','firstname','lastname']).then(({data})=> setParents(data.data))
  }, []);

  const onSubmit = async values => {
    try {
      const {status, data} = await handleSubmit(values); // Pass values here!
      
      if (status === 200 || status === 201) {
       // navigate(ADMIN_DASHBOARD_ROUTE);
        reset();
      }
    } catch (error) {
      // Fixed: use 'error' instead of undefined 'response'
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([fieldName, errorMessages]) => {
          setError(fieldName, {
            message: Array.isArray(errorMessages) ? errorMessages.join(", ") : errorMessages
          })
        })
      } else {
        // Handle general errors
        setError("root", {
          message: error.response?.data?.message || "An error occurred"
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({field}) => (
              <FormItem>
                <FormLabel>First Name    </FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({field}) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({field}) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="blood_type"
          render={({field}) => (
            <FormItem>
              <FormLabel>Blood Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Blood Type"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {['O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bloodType, key) =>
                    <SelectItem key={key} value={bloodType}>{bloodType}</SelectItem>)
                  }
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({field}) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="m"/>
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="f"/>
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="gender"
          render={({field}) => (
            <FormItem>
              <FormLabel>Parent</FormLabel>
              <Select onValueChange={field.onChange} 
              defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Parent"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {parents.map((parent, key) =>
                    <SelectItem key={key} value={parent.id.toString()}>{parent.firstname} {parent.lastname}</SelectItem>)
                  }
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
            )}
            />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className="text-sm text-red-500">
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {values? 'Update':'Create'} Parent
        </Button>
      </form>
    </Form>
  )
}



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

const formSchema = z.object({
  firstname: z.string().min(1, "First name is required").max(50),
  lastname: z.string().min(1, "Last name is required").max(50),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required").max(1),
  blood_type: z.string().min(1, "Blood type is required"),
  address: z.string().min(1, "Address is required").max(255),
  phone: z.string().min(8, "Phone must be at least 8 digits").max(15),
  email: z.string().email("Invalid email").min(2).max(50),
  password: z.string().min(8, "Password must be at least 8 characters").max(30)
})

export default function ParentUpsertForm({handleSubmit, values}) {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: values || {
      firstname: "",
      lastname: "",
      date_of_birth: "",
      gender: "",
      blood_type: "",
      address: "",
      phone: "",
      email: "",
      password: ""
    }
  })
  
  const {setError, formState: {isSubmitting}, reset} = form
 
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
                <FormLabel>First Name</FormLabel>
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
                    {['O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bloodType) =>
                      <SelectItem key={bloodType} value={bloodType}>{bloodType}</SelectItem>
                    )}
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
          name="address"
          render={({field}) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="123 Main Street, City, Country"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({field}) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
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



// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form.jsx";
// import { Input } from "../ui/input.jsx";
// import { Button } from "../ui/button.jsx";
// import { Loader } from "lucide-react";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select.jsx";
// import { Textarea } from "../ui/textarea.jsx";
// import { useNavigate } from "react-router-dom";
// import { ADMIN_DASHBOARD_ROUTE } from "../../router/index.jsx";

// // ✅ Validation propre (alignée avec Laravel)
// const formSchema = z.object({
//   firstname: z.string().min(1, "Firstname is required").max(50),
//   lastname: z.string().min(1, "Lastname is required").max(50),
//   date_of_birth: z.string().min(1, "Date of birth is required"),
//   gender: z.enum(["m", "f"], { required_error: "Gender is required" }),
//   blood_type: z.string().min(1, "Blood type is required"),
//   address: z.string().min(1, "Address is required").max(255),
//   phone: z
//     .string()
//     .min(8, "Phone must be at least 8 digits")
//     .max(15, "Phone too long"),
//   email: z.string().email("Invalid email"),
//   password: z.string().min(8, "Min 8 characters").max(30),
// });

// export default function ParentUpsertForm({ handleSubmit, values }) {
//   const navigate = useNavigate();

//   const isUpdate = !!values;

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: values || {
//       firstname: "",
//       lastname: "",
//       date_of_birth: "",
//       gender: "",
//       blood_type: "",
//       address: "",
//       phone: "",
//       email: "",
//       password: "",
//     },
//   });

//   const {
//     setError,
//     formState: { isSubmitting },
//     reset,
//   } = form;

//   // ✅ FIX COMPLET SUBMIT
//   const onSubmit = async (formValues) => {
//     console.log("FORM VALUES 👉", formValues);
//     try {
//       const { status, data } = await handleSubmit(formValues);

//       if (status === 200 || status === 201) {
//         navigate(ADMIN_DASHBOARD_ROUTE);
//         reset();
//       }
//     } catch (error) {
//       console.log("API ERROR 👉", error.response);

//       // ✅ Gestion erreurs Laravel (422)
//       if (error.response?.data?.errors) {
//         Object.entries(error.response.data.errors).forEach(
//           ([fieldName, errorMessages]) => {
//             setError(fieldName, {
//               message: Array.isArray(errorMessages)
//                 ? errorMessages.join(", ")
//                 : errorMessages,
//             });
//           }
//         );
//       } else {
//         // fallback
//         setError("root", {
//           message:
//             error.response?.data?.message ||
//             "Something went wrong, please try again",
//         });
//       }
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         {/* FIRSTNAME */}
//         <FormField
//           control={form.control}
//           name="firstname"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Firstname</FormLabel>
//               <FormControl>
//                 <Input placeholder="Firstname" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* LASTNAME */}
//         <FormField
//           control={form.control}
//           name="lastname"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Lastname</FormLabel>
//               <FormControl>
//                 <Input placeholder="Lastname" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* DATE */}
//         <FormField
//           control={form.control}
//           name="date_of_birth"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Date of birth</FormLabel>
//               <FormControl>
//                 <Input type="date" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* GENDER */}
//         <FormField
//           control={form.control}
//           name="gender"
//           render={({ field }) => (
//             <FormItem className="space-y-3">
//               <FormLabel>Gender</FormLabel>
//               <FormControl>
//                 <RadioGroup
//                   onValueChange={field.onChange}
//                   value={field.value}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <RadioGroupItem value="m" />
//                     <FormLabel className="font-normal">Male</FormLabel>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <RadioGroupItem value="f" />
//                     <FormLabel className="font-normal">Female</FormLabel>
//                   </div>
//                 </RadioGroup>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* BLOOD TYPE */}
//         <FormField
//           control={form.control}
//           name="blood_type"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Blood Type</FormLabel>
//               <Select onValueChange={field.onChange} value={field.value}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select Blood Type" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   {["O-", "O+", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
//                     (type) => (
//                       <SelectItem key={type} value={type}>
//                         {type}
//                       </SelectItem>
//                     )
//                   )}
//                 </SelectContent>
//               </Select>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* ADDRESS */}
//         <FormField
//           control={form.control}
//           name="address"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Address</FormLabel>
//               <FormControl>
//                 <Textarea {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* PHONE */}
//         <FormField
//           control={form.control}
//           name="phone"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Phone</FormLabel>
//               <FormControl>
//                 <Input type="tel" placeholder="Phone" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* EMAIL */}
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* PASSWORD */}
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input type="password" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* GLOBAL ERROR */}
//         {form.formState.errors.root && (
//           <p className="text-red-500 text-sm">
//             {form.formState.errors.root.message}
//           </p>
//         )}

//         {/* SUBMIT */}
//         <Button type="submit" disabled={isSubmitting}>
//           {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
//           {isUpdate ? "Update Parent" : "Create Parent"}
//         </Button>
//       </form>
//     </Form>
//   );
// }
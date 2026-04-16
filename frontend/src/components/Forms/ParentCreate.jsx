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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.jsx";
import { Textarea } from "../ui/textarea.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { ADMIN_DASHBOARD_ROUTE } from "../../router/index.jsx";
import ParentApi from "../../services/Api/ParentApi.js";

const formSchema = z.object({
  firstname: z.string().min(1).max(50),
  lastname: z.string().min(1, "Last name is required").max(50),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["m", "f"], { required_error: "Gender is required" }),
  blood_type: z.string().min(1, "Blood type is required"),
  address: z.string().min(1, "Address is required").max(255),
  phone: z.string()
    .min(8, "Phone must be at least 8 digits")
    .max(15, "Phone must be at most 15 digits")
    .regex(/^[0-9+\s-()]+$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address").min(2).max(50),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
});

export default function ParentCreate({ initialValues, onSuccess }) {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
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
  });

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    try {
      const { data, status } = await ParentApi.create(values);
      
      if (status === 200 || status === 201) {
        // Success callback if provided
        if (onSuccess) {
          onSuccess(data);
        } else {
          // Navigate to admin dashboard by default
          navigate(ADMIN_DASHBOARD_ROUTE);
        }
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        // Handle validation errors from server
        Object.entries(error.response.data.errors).forEach(([fieldName, errorMessages]) => {
          setError(fieldName, {
            message: Array.isArray(errorMessages) ? errorMessages.join(", ") : errorMessages
          });
        });
      } else {
        // Handle general errors
        setError("root", {
          message: error.response?.data?.message || "An error occurred while creating the parent"
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="blood_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Blood Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {['O-', 'O+', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((bloodType) => (
                      <SelectItem key={bloodType} value={bloodType}>
                        {bloodType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
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
                      <RadioGroupItem value="m" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="f" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="123 Main Street, City, Country"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
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
          Create Parent
        </Button>
      </form>
    </Form>
  );
}
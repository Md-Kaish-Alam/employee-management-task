// import { zodResolver } from "@hookform/resolvers/zod";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useState, useRef, useContext } from "react";
// import AuthContext from "@/context/AuthContext";

// // Define the Zod schema for the form
// const FormSchema = z.object({
//   f_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
//   f_email: z
//     .string()
//     .email({ message: "Please enter a valid email address." })
//     .nonempty(),
//   f_mobile_no: z
//     .string()
//     .regex(/^[0-9]{10}$/, { message: "Mobile number must be 10 digits." }),
//   f_designation: z.enum(["HR", "Manager", "Sales"], {
//     message: "Please select a valid designation.",
//   }),
//   f_gender: z.enum(["Male", "Female"], { message: "Please select a gender." }),
//   f_course: z
//     .array(z.string())
//     .nonempty({ message: "You must select at least one course." }),
//   f_image: z.string().optional(),
// });

// type FormData = z.infer<typeof FormSchema>;

// const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

// const AddEmployee = () => {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const { token } = useContext(AuthContext);

//   const form = useForm<FormData>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       f_name: "",
//       f_email: "",
//       f_mobile_no: "",
//       f_designation: "HR", // Default value
//       f_gender: "Male", // Default value
//       f_course: [],
//       f_image: "",
//     },
//   });

//   const onSubmit = async (data: FormData) => {
//     const formData = new FormData();
//     formData.append("f_name", data.f_name);
//     formData.append("f_email", data.f_email);
//     formData.append("f_mobile_no", data.f_mobile_no);
//     formData.append("f_designation", data.f_designation);
//     formData.append("f_gender", data.f_gender);
//     data.f_course.forEach((course) => {
//       formData.append("f_course[]", course); // Use "f_course[]" for array
//     });

//     const file = fileInputRef.current?.files?.[0]; // Safely access the file
//     if (file) {
//       formData.append("f_image", file); // Append the file if it exists
//     }

//     try {
//       const response = await axios.post(`${BASE_URL}/employees`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 201) {
//         toast({
//           title: "Employee Created",
//           description: response.data.message,
//         });
//         navigate("/employee_list");
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         if (error.response && error.response.data) {
//           setError(error.response.data.message || "Failed to create employee");
//         } else {
//           setError("Failed to create employee");
//         }
//       } else {
//         setError("An unexpected error occurred");
//       }
//     }
//   };

//   if (error) {
//     toast({
//       title: "Error",
//       description: error || "Something went wrong!",
//       variant: "destructive",
//     });
//   }

//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 mx-4 my-6 p-6 rounded-md">
//       <div className="flex flex-wrap justify-between">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//             <div className="flex space-x-6">
//               {/* First Column */}
//               <div className="flex-1 space-y-6">
//                 {/* Name Field */}
//                 <FormField
//                   control={form.control}
//                   name="f_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter employee name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Email Field */}
//                 <FormField
//                   control={form.control}
//                   name="f_email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter employee email" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Mobile Number Field */}
//                 <FormField
//                   control={form.control}
//                   name="f_mobile_no"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Mobile Number</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter 10-digit mobile number"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Designation Select Field */}
//                 <FormField
//                   control={form.control}
//                   name="f_designation"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Designation</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}
//                       >
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select a designation" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="HR">HR</SelectItem>
//                           <SelectItem value="Manager">Manager</SelectItem>
//                           <SelectItem value="Sales">Sales</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {/* Second Column */}
//               <div className="flex-1 space-y-6">
//                 {/* Gender Field with RadioGroup */}
//                 <FormField
//                   control={form.control}
//                   name="f_gender"
//                   render={({ field }) => (
//                     <FormItem className="space-y-3">
//                       <FormLabel>Gender</FormLabel>
//                       <FormControl>
//                         <RadioGroup
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                           className="flex space-y-1"
//                         >
//                           <FormItem className="flex items-center space-x-3 space-y-0">
//                             <FormControl>
//                               <RadioGroupItem value="Male" />
//                             </FormControl>
//                             <FormLabel className="font-normal">Male</FormLabel>
//                           </FormItem>
//                           <FormItem className="flex items-center space-x-3 space-y-0">
//                             <FormControl>
//                               <RadioGroupItem value="Female" />
//                             </FormControl>
//                             <FormLabel className="font-normal">
//                               Female
//                             </FormLabel>
//                           </FormItem>
//                         </RadioGroup>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Courses Field with Checkbox */}
//                 <FormField
//                   control={form.control}
//                   name="f_course"
//                   render={() => (
//                     <FormItem>
//                       <FormLabel>Course</FormLabel>
//                       <div className="space-y-3">
//                         {/* MCA Checkbox */}
//                         <FormField
//                           control={form.control}
//                           name="f_course"
//                           render={({ field }) => (
//                             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background dark:bg-background">
//                               <FormControl>
//                                 <Checkbox
//                                   checked={field.value.includes("MCA")}
//                                   onCheckedChange={(checked) =>
//                                     field.onChange(
//                                       checked
//                                         ? [...field.value, "MCA"]
//                                         : field.value.filter(
//                                             (val) => val !== "MCA"
//                                           )
//                                     )
//                                   }
//                                 />
//                               </FormControl>
//                               <div className="space-y-1 leading-none">
//                                 <FormLabel>MCA</FormLabel>
//                               </div>
//                             </FormItem>
//                           )}
//                         />

//                         {/* BCA Checkbox */}
//                         <FormField
//                           control={form.control}
//                           name="f_course"
//                           render={({ field }) => (
//                             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background dark:bg-background">
//                               <FormControl>
//                                 <Checkbox
//                                   checked={field.value.includes("BCA")}
//                                   onCheckedChange={(checked) =>
//                                     field.onChange(
//                                       checked
//                                         ? [...field.value, "BCA"]
//                                         : field.value.filter(
//                                             (val) => val !== "BCA"
//                                           )
//                                     )
//                                   }
//                                 />
//                               </FormControl>
//                               <div className="space-y-1 leading-none">
//                                 <FormLabel>BCA</FormLabel>
//                               </div>
//                             </FormItem>
//                           )}
//                         />

//                         {/* BSC Checkbox */}
//                         <FormField
//                           control={form.control}
//                           name="f_course"
//                           render={({ field }) => (
//                             <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background dark:bg-background">
//                               <FormControl>
//                                 <Checkbox
//                                   checked={field.value.includes("BSC")}
//                                   onCheckedChange={(checked) =>
//                                     field.onChange(
//                                       checked
//                                         ? [...field.value, "BSC"]
//                                         : field.value.filter(
//                                             (val) => val !== "BSC"
//                                           )
//                                     )
//                                   }
//                                 />
//                               </FormControl>
//                               <div className="space-y-1 leading-none">
//                                 <FormLabel>BSC</FormLabel>
//                               </div>
//                             </FormItem>
//                           )}
//                         />
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Image Upload Field */}
//                 <FormItem>
//                   <FormLabel>Profile Image (optional)</FormLabel>
//                   <FormControl>
//                     <Input type="file" ref={fileInputRef} accept="image/*" />
//                   </FormControl>
//                 </FormItem>
//               </div>
//             </div>
//             {/* Submit Button */}
//             <div className="flex justify-end mt-6">
//               <Button
//                 type="submit"
//                 // className="w-full"
//                 disabled={form.formState.isSubmitting}
//               >
//                 Add Employee
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;

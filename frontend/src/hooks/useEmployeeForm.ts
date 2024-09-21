import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  f_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  f_email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .nonempty(),
  f_mobile_no: z
    .string()
    .regex(/^[0-9]{10}$/, { message: "Mobile number must be 10 digits." }),
  f_designation: z.enum(["HR", "Manager", "Sales"], {
    message: "Please select a valid designation.",
  }),
  f_gender: z.enum(["Male", "Female"], { message: "Please select a gender." }),
  f_course: z
    .array(z.string())
    .min(1, { message: "You must select at least one course." }),
  f_image: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof FormSchema>;

interface useEmployeeFormProps {
  defaultValues: EmployeeFormValues;
}

export const useEmployeeForm = ({ defaultValues }: useEmployeeFormProps) => {
  return useForm({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
};

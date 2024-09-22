import { Link } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEmployeeForm, EmployeeFormValues } from "@/hooks/useEmployeeForm";

interface EmployeeFormProps {
  defaultValues: EmployeeFormValues;
  onSubmit: (data: EmployeeFormValues) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isUpdateForm?: boolean;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  defaultValues,
  onSubmit,
  fileInputRef,
  isUpdateForm,
}) => {
  const form = useEmployeeForm({ defaultValues });

  return (
    <div className="flex flex-wrap justify-between">
      <h1 className="text-xl font-bold mb-6">
        {isUpdateForm ? "Update Employee Details" : "Add Employee Details"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex space-x-6">
            {/* First Column */}
            <div className="flex-1 space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="f_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter employee name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="f_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter employee email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile Number Field */}
              <FormField
                control={form.control}
                name="f_mobile_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter 10-digit mobile number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Designation Select Field */}
              <FormField
                control={form.control}
                name="f_designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a designation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Manager">Manager</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Second Column */}
            <div className="flex-1 space-y-6">
              {/* Gender Field with RadioGroup */}
              <FormField
                control={form.control}
                name="f_gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Male" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Female" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Courses Field with Checkbox */}
              <FormField
                control={form.control}
                name="f_course"
                render={() => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <div className="space-y-3">
                      {/* MCA Checkbox */}
                      <FormField
                        control={form.control}
                        name="f_course"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background dark:bg-background">
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes("MCA")}
                                onCheckedChange={(checked) =>
                                  field.onChange(
                                    checked
                                      ? [...field.value, "MCA"]
                                      : field.value.filter(
                                          (val) => val !== "MCA"
                                        )
                                  )
                                }
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>MCA</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      {/* BCA Checkbox */}
                      <FormField
                        control={form.control}
                        name="f_course"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background dark:bg-background">
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes("BCA")}
                                onCheckedChange={(checked) =>
                                  field.onChange(
                                    checked
                                      ? [...field.value, "BCA"]
                                      : field.value.filter(
                                          (val) => val !== "BCA"
                                        )
                                  )
                                }
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>BCA</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />

                      {/* BSC Checkbox */}
                      <FormField
                        control={form.control}
                        name="f_course"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background dark:bg-background">
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes("BSC")}
                                onCheckedChange={(checked) =>
                                  field.onChange(
                                    checked
                                      ? [...field.value, "BSC"]
                                      : field.value.filter(
                                          (val) => val !== "BSC"
                                        )
                                  )
                                }
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>BSC</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload Field */}
              <FormItem>
                <FormLabel>Profile Image (optional)</FormLabel>
                <FormControl>
                  <Input type="file" ref={fileInputRef} accept="image/*" />
                </FormControl>
              </FormItem>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex items-center justify-end mt-6 gap-4">
            <Button
              type="submit"
              // className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {isUpdateForm ? "Update Employee" : "Create Employee"}
            </Button>
            <Button>
              <Link to="/employee_list">Cancel</Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeForm;

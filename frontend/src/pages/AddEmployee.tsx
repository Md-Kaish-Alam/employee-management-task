import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";

import { useToast } from "@/hooks/use-toast";
import AuthContext from "@/context/AuthContext";
import EmployeeForm from "@/components/EmployeeForm";
import { EmployeeFormValues } from "@/hooks/useEmployeeForm";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const AddEmployee = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { token } = useContext(AuthContext);

  const defaultValues: EmployeeFormValues = {
    f_name: "",
    f_email: "",
    f_mobile_no: "",
    f_designation: "HR",
    f_gender: "Male",
    f_course: [],
    f_image: "",
  };

  const onSubmit = async (data: EmployeeFormValues) => {
    const formData = new FormData();
    formData.append("f_name", data.f_name);
    formData.append("f_email", data.f_email);
    formData.append("f_mobile_no", data.f_mobile_no);
    formData.append("f_designation", data.f_designation);
    formData.append("f_gender", data.f_gender);
    data.f_course.forEach((course) => {
      formData.append("f_course[]", course); // Use "f_course[]" for array
    });

    const file = fileInputRef.current?.files?.[0]; // Safely access the file
    if (file) {
      formData.append("f_image", file); // Append the file if it exists
    }

    try {
      const response = await axios.post(`${BASE_URL}/employees`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast({
          title: "Employee Created",
          description: response.data.message,
        });
        navigate("/employee_list");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setError(error.response.data.message || "Failed to create employee");
        } else {
          setError("Failed to create employee");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  if (error) {
    toast({
      title: "Error",
      description: error || "Something went wrong!",
      variant: "destructive",
    });
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 mx-4 my-6 p-6 rounded-md">
      <EmployeeForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        fileInputRef={fileInputRef}
      />
    </div>
  );
};

export default AddEmployee;

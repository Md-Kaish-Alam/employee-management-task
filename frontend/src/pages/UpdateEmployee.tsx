import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";

import { useToast } from "@/hooks/use-toast";
import AuthContext from "@/context/AuthContext";
import EmployeeForm from "@/components/EmployeeForm";
import { EmployeeFormValues } from "@/hooks/useEmployeeForm";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const UpdateEmployee = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { token } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(null);

  const defaultValues: EmployeeFormValues = {
    f_name: "",
    f_email: "",
    f_mobile_no: "",
    f_designation: "HR",
    f_gender: "Male",
    f_course: [],
    f_image: "",
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployeeData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data) {
            setError(
              error.response.data.message || "Failed to create employee"
            );
          } else {
            setError("Failed to create employee");
          }
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    fetchEmployeeData();
  }, [id, token]);

  const onSubmit = async (data: EmployeeFormValues) => {
    const formData = new FormData();
    formData.append("f_name", data.f_name);
    formData.append("f_email", data.f_email);
    formData.append("f_mobile_no", data.f_mobile_no);
    formData.append("f_designation", data.f_designation);
    formData.append("f_gender", data.f_gender);
    data.f_course.forEach((course) => {
      formData.append("f_course[]", course);
    });

    const file = fileInputRef.current?.files?.[0];
    if (file) {
      formData.append("f_image", file);
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/employees/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Employee Updated",
          description: response.data.message,
        });
        navigate("/employee_list");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setError(error.response.data.message || "Failed to update employee");
        } else {
          setError("Failed to update employee");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }

    if (error) {
      toast({
        title: "Error",
        description: error || "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 mx-4 my-6 p-6 rounded-md">
      <EmployeeForm
        defaultValues={employeeData || defaultValues}
        onSubmit={onSubmit}
        fileInputRef={fileInputRef}
        isUpdateForm
      />
    </div>
  );
};

export default UpdateEmployee;

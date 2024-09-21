import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";

import { Loading } from "@/components/Loading";
import { Employee } from "@/constants/types";
import AuthContext from "@/context/AuthContext";
import { DataTable } from "@/components/employee_table/data-table";
import { columns } from "@/components/employee_table/columns";
import { Button } from "@/components/ui/button";
import { ListRestart } from "lucide-react";

const defaultEmployeesData = [
  {
    f_Id: "",
    f_image: "",
    f_name: "",
    f_email: "",
    f_mobile_no: "",
    f_designation: "",
    f_gender: "",
    f_course: "",
    f_created_date: "",
  },
];

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const EmployeeList = () => {
  const { token } = useContext(AuthContext);

  const [employees, setEmployees] = useState<Employee[]>(defaultEmployeesData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Employee[]>(`${BASE_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // This is an Axios error
        if (error.response && error.response.data) {
          setError(error.response.data.error || "Login failed");
        } else {
          setError("Login failed");
        }
      } else {
        // This is a general error
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // Refresh table data function
  const handleRefreshData = () => {
    fetchEmployees(); // Re-fetch employees when the button is clicked
  };

  const handleDeleteEmployee = async (f_Id: string) => {
    try {
      await axios.delete(`${BASE_URL}/employees/${f_Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the employee from the state
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.f_Id !== f_Id)
      );

      handleRefreshData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Failed to delete employee");
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return alert(error);
  }

  return (
    <div className="m-6">
      <div className="flex items-center justify-end gap-4">
        <p>Total Count: {employees.length}</p>
        <Button variant="ghost" onClick={handleRefreshData}>
          <ListRestart />
        </Button>
        <Button className="bg-blue-800 text-white hover:bg-blue-600">
          Add New Employee
        </Button>
      </div>
      <DataTable columns={columns({ handleDeleteEmployee })} data={employees} />
    </div>
  );
};

export default EmployeeList;

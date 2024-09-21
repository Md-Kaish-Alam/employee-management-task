import axios from "axios";
import { ListRestart } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";

import { Employee } from "@/constants/types";
import { Loading } from "@/components/Loading";
import AuthContext from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/employee_table/columns";
import { DataTable } from "@/components/employee_table/data-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";

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
  const [error, setError] = useState<string>("");

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get<Employee[]>(`${BASE_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setError(error.response.data.error || "Failed to fetch employees");
        } else {
          setError("Failed to fetch employees");
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleRefreshData = () => {
    fetchEmployees();
  };

  const handleDeleteEmployee = async (f_Id: string) => {
    try {
      await axios.delete(`${BASE_URL}/employees/${f_Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  return (
    <div className="m-6">
      {isLoading && <Loading />}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center justify-end gap-4">
        <p>Total Count: {employees.length}</p>
        <Button
          variant="ghost"
          onClick={handleRefreshData}
          disabled={isLoading}
        >
          <ListRestart />
        </Button>
        <Link to="/add_employee">
          <Button className="bg-blue-800 text-white hover:bg-blue-600">
            Add New Employee
          </Button>
        </Link>
      </div>
      <DataTable columns={columns({ handleDeleteEmployee })} data={employees} />
    </div>
  );
};

export default EmployeeList;

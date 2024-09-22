import axios from "axios";
import { Link } from "react-router-dom";
import { ListRestart, Plus } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";

import { toast } from "@/hooks/use-toast";
import { Employee } from "@/constants/types";
import { Loading } from "@/components/Loading";
import AuthContext from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { columns } from "@/components/employee_table/columns";
import { DataTable } from "@/components/employee_table/data-table";
import { DownloadExcel } from "@/components/DownloadExcel";
import { Hint } from "@/components/Hint";

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
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

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
      const response = await axios.delete(`${BASE_URL}/employees/${f_Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.f_Id !== f_Id)
      );

      if (response.status === 200) {
        toast({
          title: "Employee Deleted",
          description: "Employee deleted successfully",
        });
      }

      handleRefreshData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Failed to delete employee");
      }
    }
  };

  if (error) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="m-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Employee List</h1>
        <div className="flex items-center justify-end gap-4">
          <p className="underline underline-offset-4 p-2 rounded-md font-semibold">
            Total Count: {employees.length}
          </p>
          <Hint label="Refresh">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefreshData}
              disabled={isLoading}
            >
              <ListRestart />
            </Button>
          </Hint>
          <DownloadExcel employees={employees} />
          <Link to="/add_employee">
            <Button className="bg-blue-800 text-white hover:bg-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        columns={columns({ handleDeleteEmployee, copiedEmail, setCopiedEmail })}
        data={employees}
      />
    </div>
  );
};

export default EmployeeList;

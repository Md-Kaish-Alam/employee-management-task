import * as XLSX from "xlsx";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Employee } from "@/constants/types";
import { Hint } from "./Hint";

interface DownloadExcelProps {
  employees: Employee[];
}

export const DownloadExcel = ({ employees }: DownloadExcelProps) => {
  const createExcelFile = (employees: Employee[]) => {
    // Prepare the worksheet data
    const worksheetData = employees.map((employee) => ({
      Name: employee.f_name,
      Email: employee.f_email,
      Mobile: employee.f_mobile_no,
      Designation: employee.f_designation,
      Gender: employee.f_gender,
      Course: Array.isArray(employee.f_course)
        ? employee.f_course.join(", ")
        : employee.f_course,
      Image: employee.f_image,
      CreatedDate: new Date(employee.f_created_date).toLocaleDateString(),
    }));

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    // Generate the Excel file and download it
    XLSX.writeFile(workbook, "Employee_Details.xlsx");
  };
  return (
    <>
      <Hint label="Download">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => createExcelFile(employees)}
        >
          <Download />
        </Button>
      </Hint>
    </>
  );
};

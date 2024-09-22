import { Link } from "react-router-dom";
import { Copy, UserRoundPen, CheckCircle, ArrowUpDown } from "lucide-react";

import { Employee } from "@/constants/types";
import { convertDateFormat } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "../ui/button";
import { UserAvatar } from "../UserAvatar";
import { DeleteEmployeeAlertBox } from "../DeleteEmployeeAlertBox";

interface ColumnsProps {
  handleDeleteEmployee: (f_Id: string) => void;
}

export const columns = ({
  handleDeleteEmployee,
  copiedEmail,
  setCopiedEmail,
}: ColumnsProps & {
  copiedEmail: string | null;
  setCopiedEmail: (email: string | null) => void;
}): ColumnDef<Employee>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorFn: (_, index: number) => index + 1,
      id: "serialNo",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sl No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => getValue(),
    },
    {
      accessorKey: "f_image",
      header: "Image",
      cell: ({ row }) => (
        <UserAvatar url={row.original.f_image} username={row.original.f_name} />
      ),
    },
    {
      accessorKey: "f_name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "f_email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-start gap-2">
          <p>{row.original.f_email}</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(row.original.f_email);
              setCopiedEmail(row.original.f_email);
              setTimeout(() => setCopiedEmail(null), 5000);
            }}
          >
            {copiedEmail === row.original.f_email ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "f_mobile_no",
      header: "Mobile No",
    },
    {
      accessorKey: "f_designation",
      header: "Designation",
    },
    {
      accessorKey: "f_gender",
      header: "Gender",
    },
    {
      accessorKey: "f_course",
      header: "Course",
    },
    {
      accessorKey: "f_created_date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => convertDateFormat(row.original.f_created_date),
    },
    {
      accessorKey: "",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Link to={`/update_employee/${row.original.f_Id}`}>
            <Button variant="outline">
              <UserRoundPen className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteEmployeeAlertBox
            id={row.original.f_Id}
            handleDeleteEmployee={handleDeleteEmployee}
          />
        </div>
      ),
    },
  ];
};

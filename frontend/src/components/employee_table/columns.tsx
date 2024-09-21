import { Employee } from "@/constants/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { UserAvatar } from "../UserAvatar";
import { UserRoundPen } from "lucide-react";
import { convertDateFormat } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteEmployeeAlertBox } from "../DeleteEmployeeAlertBox";

interface ColumnsProps {
  handleDeleteEmployee: (f_Id: string) => void;
}

export const columns = ({
  handleDeleteEmployee,
}: ColumnsProps): ColumnDef<Employee>[] => [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sl No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "f_image",
    header: "Image",
    cell: ({ row }) => (
      <UserAvatar
        url={row.original.f_image}
        username={row.original.f_name}
        isBorder
      />
    ),
  },
  {
    accessorKey: "f_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "f_email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => convertDateFormat(row.original.f_created_date),
  },
  {
    accessorKey: "",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" onClick={() => console.log("clicked")}>
          <UserRoundPen className="h-4 w-4" />
        </Button>
        <DeleteEmployeeAlertBox
          id={row.original.f_Id}
          handleDeleteEmployee={handleDeleteEmployee}
        />
      </div>
    ),
  },
];

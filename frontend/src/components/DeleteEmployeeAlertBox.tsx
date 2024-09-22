import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Hint } from "./Hint";

interface DeleteEmployeeAlertBoxProps {
  id: string;
  handleDeleteEmployee: (id: string) => void;
}

export const DeleteEmployeeAlertBox = ({
  id,
  handleDeleteEmployee,
}: DeleteEmployeeAlertBoxProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Hint label="Delete" isDelete>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </Hint>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete employee
            from servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-800 hover:bg-red-900 dark:text-white"
            onClick={() => handleDeleteEmployee(id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

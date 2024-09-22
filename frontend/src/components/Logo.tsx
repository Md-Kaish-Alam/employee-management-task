import { Link } from "react-router-dom";
import { PersonStanding } from "lucide-react";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center justify-center gap-2">
      <div className="h-14 w-14 bg-blue-800 rounded-full p-2">
        <PersonStanding className="h-full w-fit text-white" />
      </div>
      <h1 className="text-blue-800 text-3xl font-semibold">EmpowerHUB</h1>
    </Link>
  );
};

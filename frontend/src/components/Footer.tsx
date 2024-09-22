import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full max-w-screen-xl mx-auto p-2 text-center">
      <p className="text-sm text-muted-foreground">
        All-in-one Employee Management System designed to simplify
        record-keeping, improve communication, and increase organizational
        productivity.
      </p>
      <span className="block text-sm text-gray-500">
        © 2024{" "}
        <Link to="/" className="text-blue-800">
          EmpowerHUB
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

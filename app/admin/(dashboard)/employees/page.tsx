import { readJSON, FILES } from "@/app/lib/db";
import { Employee } from "@/app/lib/types";
import { EmployeesTable } from "@/app/components/admin/EmployeesTable";

export default async function EmployeesPage() {
  const employees = await readJSON<Employee>(FILES.EMPLOYEES);
  return <EmployeesTable initialEmployees={employees} />;
}

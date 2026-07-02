"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Plus, Trash } from "lucide-react";
import type { Employee } from "@/app/lib/types";
import {
  deleteEmployee,
  mergeEmployees,
} from "@/app/lib/client-actions/employees";

export function EmployeesTable({
  initialEmployees,
}: {
  initialEmployees: Employee[];
}) {
  const [employees, setEmployees] = useState(() =>
    mergeEmployees(initialEmployees),
  );

  const handleDelete = (id: string) => {
    setEmployees(deleteEmployee(id, initialEmployees));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="admin-page-title">Employees</h1>
          <p className="mt-1 text-slate-500">
            Manage your team and their documents.
          </p>
        </div>
        <Link href="/admin/employees/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </div>

      <div className="admin-table-wrap">
        <div className="overflow-x-auto bg-white">
          <table className="w-full min-w-[600px] border-collapse bg-white text-left text-sm sm:text-base">
            <thead className="admin-table-head">
              <tr>
                <th className="admin-table-th">Name</th>
                <th className="admin-table-th">Role</th>
                <th className="admin-table-th">Department</th>
                <th className="admin-table-th">Status</th>
                <th className="admin-table-th text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {employees.length === 0 ? (
                <tr className="admin-table-row">
                  <td
                    colSpan={5}
                    className="admin-table-td py-12 text-center text-slate-500"
                  >
                    No employees found. Click &quot;Add Employee&quot; to get
                    started.
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id} className="admin-table-row">
                    <td className="admin-table-td">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                          {employee.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">
                            {employee.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="admin-table-td">{employee.role}</td>
                    <td className="admin-table-td">{employee.department}</td>
                    <td className="admin-table-td">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          employee.status === "Active"
                            ? "bg-primary/10 text-primary"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                    <td className="admin-table-td text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

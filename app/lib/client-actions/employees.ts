"use client";

import { v4 as uuidv4 } from "uuid";
import type { Document, Employee } from "@/app/lib/types";

const STORAGE_KEY = "vantage_static_employees";

function readEmployees(): Employee[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function writeEmployees(employees: Employee[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}

export function mergeEmployees(initial: Employee[]): Employee[] {
  const stored = readEmployees();
  if (stored.length === 0) return initial;
  const ids = new Set(stored.map((e) => e.id));
  return [...stored, ...initial.filter((e) => !ids.has(e.id))];
}

export async function createEmployee(
  _prevState: { error?: string } | null,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const department = formData.get("department") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const status = (formData.get("status") as "Active" | "Inactive") || "Active";
    const documentFiles = formData.getAll("documents") as File[];
    const documents: Document[] = [];

    for (const file of documentFiles) {
      if (file.size > 0) {
        documents.push({
          id: uuidv4(),
          name: file.name,
          type: file.type,
          url: "#",
          uploadedAt: new Date().toISOString(),
        });
      }
    }

    const employees = readEmployees();
    employees.push({
      id: uuidv4(),
      name,
      role,
      department,
      email,
      phone,
      status,
      documents,
      joinedDate: new Date().toISOString(),
    });
    writeEmployees(employees);
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/admin/employees`;
    return null;
  } catch {
    return { error: "Failed to create employee" };
  }
}

export function deleteEmployee(id: string, initial: Employee[]) {
  const employees = mergeEmployees(initial).filter((e) => e.id !== id);
  writeEmployees(employees);
  return employees;
}

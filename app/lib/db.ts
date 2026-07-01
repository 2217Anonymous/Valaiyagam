import fs from "fs/promises";
import path from "path";
import { Admin, Employee, Team, Job, Resume } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

const getFilePath = (fileName: string) => path.join(DATA_DIR, fileName);

// Ensure file exists, initialize with default if not
async function ensureFile(fileName: string, defaultData: any[]) {
  const filePath = getFilePath(fileName);
  try {
    await fs.access(filePath);
  } catch {
    // Check if data directory exists
    try {
      await fs.access(DATA_DIR);
    } catch {
      await fs.mkdir(DATA_DIR, { recursive: true });
    }
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
  }
}

// Generic Read
export async function readJSON<T>(fileName: string): Promise<T[]> {
  await ensureFile(fileName, []);
  const filePath = getFilePath(fileName);
  const data = await fs.readFile(filePath, "utf-8");
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Generic Write
export async function writeJSON<T>(fileName: string, data: T[]): Promise<void> {
  await ensureFile(fileName, []); // Ensure dir exists
  const filePath = getFilePath(fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Initial Seeding
export async function seedDatabase() {
  const admins = await readJSON<Admin>("admins.json");
  if (admins.length === 0) {
    const defaultAdmin: Admin = {
      id: "1",
      username: "admin",
      passwordHash: "admin123", // In real app, hash this!
    };
    await writeJSON("admins.json", [defaultAdmin]);
    console.log("Admin seeded");
  }
}

// File constants
export const FILES = {
  ADMINS: "admins.json",
  EMPLOYEES: "employees.json",
  TEAMS: "teams.json",
  JOBS: "jobs.json",
  RESUMES: "resumes.json",
  GALLERY: "gallery.json",
};

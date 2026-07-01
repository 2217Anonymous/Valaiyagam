export interface Admin {
  id: string;
  username: string;
  passwordHash: string; // In a real app this would be hashed, we'll simulate
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
  teamId?: string; // Relationship to Team
  documents: Document[];
  joinedDate: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  leadId?: string; // Relationship to Employee (Team Lead)
  image?: string;
  members: string[]; // List of Employee IDs
}

export interface Job {
  id: string;
  code: string; // Unique Job Code
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  description: string;
  requirements: string[];
  postedDate: string;
  status: "Open" | "Closed";
}

export interface Resume {
  id: string;
  jobId: string; // Relationship to Job
  candidateName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  submittedAt: string;
}

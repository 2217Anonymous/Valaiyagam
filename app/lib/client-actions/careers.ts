"use client";

export async function submitApplication(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const resumeFile = formData.get("resume") as File;

  if (!name || !email || !phone) {
    return { error: "Please fill in all required fields." };
  }

  if (!resumeFile || resumeFile.size === 0) {
    return { error: "Resume is required" };
  }

  return { success: true };
}

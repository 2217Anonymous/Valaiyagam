import { redirect } from "next/navigation";

/** /admin → login (auth guard on dashboard handles session client-side). */
export default function AdminIndexPage() {
  redirect("/admin/login/");
}

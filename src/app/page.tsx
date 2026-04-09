import { redirect } from "next/navigation";
export default function RootPage() {
  redirect("/test"); // Paksa localhost:3000 langsung lari ke /test
}
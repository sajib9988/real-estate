
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/form/Navbar";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <Navbar />


      <Toaster />
    </main>
  );
}
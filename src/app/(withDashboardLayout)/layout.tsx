
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getProfile } from "@/services/Profile";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: profile } = await getProfile();
  const userRole = profile?.role || 'user'; // Default to 'user' if role not available

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarInset>
        {/* Header with breadcrumb navigation */}
        <header className="sticky top-0 z-10 bg-background flex h-16 items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb className="hidden sm:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{userRole === 'admin' ? 'Admin' : 'User'} Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Add user profile/notification components here if needed */}
        </header>

        {/* Main content area */}
        <main className={`p-4 relative  pt-6 min-h-[calc(100vh-4rem)] gradientBg`}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
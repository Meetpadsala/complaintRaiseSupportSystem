import { AppSidebar } from "../../../components/app-sidebar"
import { SidebarProvider } from "../../../components/ui/sidebar"

const Page = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">User dashboard content</main>
      </div>
    </SidebarProvider>
  )
}

export default Page
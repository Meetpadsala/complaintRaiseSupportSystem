import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { AppSidebar } from "../../../components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";

import { Separator } from "../../../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../../components/ui/sidebar";
import { getRaisedComplaint } from "../../../services/user";
import { useQuery } from "@tanstack/react-query";
import { RaiseComplaintModal } from "../../../components/RaiseComplaintModal";

export default function Page() {
  const [theme, setTheme] = useState(false);
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  const { data } = useQuery({
    queryKey: ["showRaisedTicked"],
    queryFn: getRaisedComplaint,
  });

  // console.log(data)

  return (
    <div
      className={theme ? "dark bg-black text-white" : "bg-white text-black"}
      style={{
        minHeight: "100vh",
        backgroundColor: theme ? "#000000" : "#ffffff",
        color: theme ? "#ffffff" : "#000000",
      }}
    >
      <SidebarProvider
        style={{ backgroundColor: theme ? "#000000" : "#ffffff" }}
      >
        <AppSidebar />
        <SidebarInset
          style={{ backgroundColor: theme ? "#000000" : "#ffffff" }}
        >
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      className={`${theme ? "text-gray-400 hover:text-gray-100" : "text-gray-400 hover:text-black"}`}
                      href="#"
                    >
                      Customer dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage
                      className={`${theme ? "text-gray-400 hover:text-gray-100" : "text-gray-400 hover:text-black"}`}
                    >
                      Overview
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      <button
                        className={`border-2 p-1 rounded-md  ${theme ? "text-white border-white" : "text-black border-black hover:bg-gray-200 hover:border-gray-300"}`}
                        onClick={toggleTheme}
                      >
                        {theme ? <Moon /> : <Sun />}
                      </button>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex justify-between">
              <div>All Complaints</div>
              <button
                onClick={() => setComplaintModalOpen(true)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  theme
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Raise New Complaint
              </button>
            </div>
            <div className="flex gap-5 flex-wrap">
             
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <RaiseComplaintModal
        open={complaintModalOpen}
        onOpenChange={setComplaintModalOpen}
        theme={theme}
      />
    </div>
  );
}

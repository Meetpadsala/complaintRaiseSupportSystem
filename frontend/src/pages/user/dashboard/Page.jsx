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

export default function Page() {
  const [theme, setTheme] = useState(false);

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
            <div className="flex gap-5">
              <article className="py-5 px-30 rounded-2xl bg-gray-300">
                <div className="">
                  <p>sumit</p>
                  <p>sumit</p>
                  <p>sumit</p>
                </div>
              </article>
              <article className="py-5 px-30 rounded-2xl bg-gray-300">
                <div>
                  <p>sumit</p>
                  <p>sumit</p>
                  <p>sumit</p>
                </div>
              </article>
              <article className="py-5 px-30 rounded-2xl bg-gray-300">
                <div>
                  <p>sumit</p>
                  <p>sumit</p>
                  <p>sumit</p>
                </div>
              </article>
            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-gray-300 rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-400 border-b-2 border-gray-500">
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Email</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Subject</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Message</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-800">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data && data.length > 0 ? (
                      data.map((complaint, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-400 hover:bg-gray-200 transition"
                        >
                          <td className="px-4 py-3 text-gray-700">{complaint.name}</td>
                          <td className="px-4 py-3 text-gray-700">{complaint.email}</td>
                          <td className="px-4 py-3 text-gray-700">{complaint.subject}</td>
                          <td className="px-4 py-3 text-gray-700 truncate max-w-xs">{complaint.message}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                complaint.status === "resolved"
                                  ? "bg-green-200 text-green-800"
                                  : complaint.status === "pending"
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-blue-200 text-blue-800"
                              }`}
                            >
                              {complaint.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-600">
                          No complaints found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

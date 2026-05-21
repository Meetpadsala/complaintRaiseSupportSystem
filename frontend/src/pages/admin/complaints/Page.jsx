import React, { useState, useEffect } from "react";
import { Moon, Sun, EllipsisVertical } from "lucide-react";
import { AppSidebar } from "../../../components/admin-app-sidebar";
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
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  adminLogout,
  deleteComplaint,
  showComplain,
  updateComplaint,
} from "../../../services/admin";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { RaiseComplaintModal } from "../../../components/RaiseComplaintModal";

export default function Page() {
  const [theme, setTheme] = useState(false);
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (theme) {
      root.style.backgroundColor = "#000000";
      body.style.backgroundColor = "#000000";
      body.style.color = "#ffffff";
      root.classList.add("dark");
    } else {
      root.style.backgroundColor = "#ffffff";
      body.style.backgroundColor = "#ffffff";
      body.style.color = "#000000";
      root.classList.remove("dark");
    }
  }, [theme]);

  const getStatusBadgeClass = (status) => {
    const normalizedStatus = (status || "Pending").toLowerCase();

    if (normalizedStatus === "resolved") {
      return "bg-green-100 text-green-700 text-xs";
    }

    if (
      normalizedStatus === "in-progress" ||
      normalizedStatus === "in progress"
    ) {
      return "bg-blue-100 text-blue-700 text-xs";
    }

    return "bg-yellow-100 text-yellow-700 text-xs";
  };

  const navigation = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      toast.success("logout is successfully");
      navigation("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["showComplaints"],
    queryFn: showComplain,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => updateComplaint(id, { status }),
    onSuccess: () => {
      toast.success("complaint status updated successfully");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const deleteComplaintMutation = useMutation({
    mutationFn: deleteComplaint,
    onSuccess: () => {
      toast.success("complaint deleted successfully");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const complaints = data?.result || [];

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
            <section>
              <section className="p-5">
                <table className="w-full border-collapse bg-white text-black">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left px-6 py-4 text-black">Name</th>
                      <th className="text-left px-6 py-4 text-black">Email</th>
                      <th className="text-left px-6 py-4 text-black">
                        Subject
                      </th>
                      <th className="text-left px-6 py-4 text-black">
                        Message
                      </th>
                      <th className="text-left px-6 py-4 text-black">Status</th>
                      <th className="text-left px-6 py-4 text-black">Date</th>
                      <th className="text-left px-6 py-4 text-black">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="px-3 py-2 text-center">
                          <Loader2 /> Loading...
                        </td>
                      </tr>
                    ) : complaints.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-3 py-2 text-center">
                          No complaints found.
                        </td>
                      </tr>
                    ) : (
                      complaints.map((complaint) => (
                        <tr
                          key={complaint?._id || complaint?.email}
                          className="border-b"
                        >
                          <td className="px-3 py-2">
                            {complaint?.name || "-"}
                          </td>
                          <td className="px-3 py-2">
                            {complaint?.email || "-"}
                          </td>
                          <td className="px-3 py-2">
                            {complaint?.subject || "-"}
                          </td>
                          <td className="px-3 py-2">
                            {complaint?.message || "-"}
                          </td>
                          <td className="px-3 py-2">
                            <p
                              className={`${getStatusBadgeClass(
                                complaint?.status,
                              )} inline-block whitespace-nowrap px-3 py-1 rounded-full text-sm`}
                            >
                              {complaint?.status || "Pending"}
                            </p>
                          </td>
                          <td className="px-3 py-2">
                            {complaint?.createdAt
                              ? new Date(
                                  complaint.createdAt,
                                ).toLocaleDateString()
                              : "-"}
                          </td>
                          <td className="px-3 py-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="rounded-lg"
                                >
                                  <EllipsisVertical />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                className="w-40"
                                align="start"
                              >
                                <DropdownMenuGroup>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      updateStatusMutation.mutate({
                                        id: complaint?._id,
                                        status: "Pending",
                                      })
                                    }
                                  >
                                    Pending
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      updateStatusMutation.mutate({
                                        id: complaint?._id,
                                        status: "Resolved",
                                      })
                                    }
                                  >
                                    Resolved
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      updateStatusMutation.mutate({
                                        id: complaint?._id,
                                        status: "In-Progress",
                                      })
                                    }
                                  >
                                    In-Progress
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      deleteComplaintMutation.mutate(
                                        complaint?._id,
                                      )
                                    }
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </section>
            </section>
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

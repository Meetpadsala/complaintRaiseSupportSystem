import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
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
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../../components/ui/sheet";

export default function Page() {
  const [theme, setTheme] = useState(false);
  const [assignTaskModalOpen, setAssignTaskModalOpen] = useState(false);
  const [assignTaskForm, setAssignTaskForm] = useState({
    employeeEmail: "",
    taskTitle: "",
    priority: "medium",
    dueDate: "",
    notes: "",
  });
  const isDarkTheme = theme;

  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const backgroundColor = isDarkTheme ? "#000000" : "#ffffff";
    const textColor = isDarkTheme ? "#ffffff" : "#000000";

    root.style.backgroundColor = backgroundColor;
    body.style.backgroundColor = backgroundColor;
    body.style.color = textColor;

    if (isDarkTheme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkTheme]);

  const pageThemeClass = isDarkTheme ? "dark bg-black text-white" : "bg-white text-black";
  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: isDarkTheme ? "#000000" : "#ffffff",
    color: isDarkTheme ? "#ffffff" : "#000000",
  };
  const breadcrumbTextClass = isDarkTheme
    ? "text-gray-400 hover:text-gray-100"
    : "text-gray-400 hover:text-black";
  const themeToggleButtonClass = `border-2 p-1 rounded-md ${
    isDarkTheme
      ? "text-white border-white"
      : "text-black border-black hover:bg-gray-200 hover:border-gray-300"
  }`;

  const handleAssignTaskInputChange = (event) => {
    const { name, value } = event.target;
    setAssignTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetAssignTaskForm = () => {
    setAssignTaskForm({
      employeeEmail: "",
      taskTitle: "",
      priority: "medium",
      dueDate: "",
      notes: "",
    });
  };

  const handleAssignTaskSubmit = (event) => {
    event.preventDefault();
    console.log("Assign task form payload", assignTaskForm);
    setAssignTaskModalOpen(false);
    resetAssignTaskForm();
  };

  return (
    <div className={pageThemeClass} style={pageStyle}>
      <SidebarProvider style={{ backgroundColor: pageStyle.backgroundColor }}>
        <AppSidebar />
        <SidebarInset style={{ backgroundColor: pageStyle.backgroundColor }}>
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
                    <BreadcrumbLink className={breadcrumbTextClass} href="#">
                      Admin dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className={breadcrumbTextClass}>
                      Assign Task
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      <button className={themeToggleButtonClass} onClick={toggleTheme}>
                        {isDarkTheme ? <Moon /> : <Sun />}
                      </button>
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-end">
              <Button
                className={isDarkTheme ? "border border-gray-600" : "border border-gray-300"}
                onClick={() => setAssignTaskModalOpen(true)}
              >
                Assign Task to Employee
              </Button>
            </div>
            <div
              className={`rounded-lg border p-4 ${
                isDarkTheme ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
              }`}
            >
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      <Sheet open={assignTaskModalOpen} onOpenChange={setAssignTaskModalOpen}>
        <SheetContent
          side="right"
          className={`${
            isDarkTheme
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-white text-black border-gray-200"
          } w-full sm:w-[420px]`}
        >
          <SheetHeader>
            <SheetTitle className={isDarkTheme ? "text-white" : "text-black"}>
              Assign Task
            </SheetTitle>
            <SheetDescription
              className={isDarkTheme ? "text-gray-300" : "text-gray-600"}
            >
              Fill in employee and task details to assign work.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleAssignTaskSubmit} className="space-y-4 px-4 pb-4">
            <div className="space-y-2">
              <label className="text-sm" htmlFor="employeeEmail">
                Employee Email
              </label>
              <Input
                id="employeeEmail"
                name="employeeEmail"
                type="email"
                value={assignTaskForm.employeeEmail}
                onChange={handleAssignTaskInputChange}
                placeholder="employee@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm" htmlFor="taskTitle">
                Task Title
              </label>
              <Input
                id="taskTitle"
                name="taskTitle"
                type="text"
                value={assignTaskForm.taskTitle}
                onChange={handleAssignTaskInputChange}
                placeholder="e.g. Resolve AC maintenance ticket"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={assignTaskForm.priority}
                onChange={handleAssignTaskInputChange}
                className={`h-8 w-full rounded-none border px-2.5 text-xs outline-none ${
                  isDarkTheme
                    ? "border-gray-600 bg-gray-800 text-white"
                    : "border-gray-300 bg-white text-black"
                }`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm" htmlFor="dueDate">
                Due Date
              </label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={assignTaskForm.dueDate}
                onChange={handleAssignTaskInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm" htmlFor="notes">
                Task Notes
              </label>
              <Textarea
                id="notes"
                name="notes"
                value={assignTaskForm.notes}
                onChange={handleAssignTaskInputChange}
                placeholder="Add instructions for the employee"
                rows={4}
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button type="submit" className="flex-1">
                Assign Task
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  resetAssignTaskForm();
                  setAssignTaskModalOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

    </div>
  );
}

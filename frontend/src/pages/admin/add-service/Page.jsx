import { useEffect, useState } from "react";
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

export default function Page() {
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => setTheme((currentTheme) => !currentTheme);

  const pageTheme = theme
    ? {
        shell: "bg-slate-950 text-slate-100",
        panel: "border-slate-800 bg-slate-900/70 text-slate-100",
        muted: "text-slate-400",
        border: "border-slate-800",
        button: "border-slate-700 text-slate-100 hover:bg-slate-800",
        header: "bg-slate-900/90",
        field: "border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500",
      }
    : {
        shell: "bg-slate-50 text-slate-900",
        panel: "border-slate-200 bg-white text-slate-900",
        muted: "text-slate-500",
        border: "border-slate-200",
        button: "border-slate-300 text-slate-900 hover:bg-slate-100",
        header: "bg-white/90",
        field: "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400",
      };

  const summaryCards = [
    { label: "Services planned", value: "08", detail: "Ready to publish" },
    { label: "Active categories", value: "05", detail: "Grouped by team" },
    { label: "Drafts", value: "03", detail: "Needs review" },
  ];

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

  return (
    <div className={`${pageTheme.shell} min-h-screen`}>
      <SidebarProvider style={{ backgroundColor: "transparent" }}>
        <AppSidebar />
        <SidebarInset style={{ backgroundColor: "transparent" }}>
          <header className={`sticky top-0 z-10 border-b ${pageTheme.border} ${pageTheme.header} backdrop-blur`}>
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4">
              <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      className={`${pageTheme.muted} transition-colors hover:text-current`}
                      href="#"
                    >
                      Admin dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage
                      className={pageTheme.muted}
                    >
                      Add service
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              </div>

              <button
                type="button"
                aria-label="Toggle theme"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${pageTheme.button}`}
                onClick={toggleTheme}
              >
                {theme ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 lg:p-6">
            <section className={`rounded-2xl border ${pageTheme.border} ${pageTheme.panel} p-6 shadow-sm`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="space-y-2">
                  <p className={`text-sm font-medium uppercase tracking-[0.2em] ${pageTheme.muted}`}>
                    Service management
                  </p>
                  <h1 className="text-2xl font-semibold md:text-3xl">
                    Add a new service
                  </h1>
                  <p className={`max-w-2xl text-sm leading-6 ${pageTheme.muted}`}>
                    Define the service name, assign the right category, and prepare the workspace for your support team.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${pageTheme.button}`}
                  >
                    Save draft
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
                  >
                    Publish service
                  </button>
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {summaryCards.map((card) => (
                <article
                  key={card.label}
                  className={`rounded-2xl border ${pageTheme.border} ${pageTheme.panel} p-5 shadow-sm`}
                >
                  <p className={`text-sm ${pageTheme.muted}`}>{card.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <h2 className="text-3xl font-semibold">{card.value}</h2>
                    <span className={`text-xs ${pageTheme.muted}`}>{card.detail}</span>
                  </div>
                </article>
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
              <article className={`rounded-2xl border ${pageTheme.border} ${pageTheme.panel} p-6 shadow-sm`}>
                <div className="mb-6 space-y-2">
                  <h2 className="text-lg font-semibold">Service details</h2>
                  <p className={`text-sm ${pageTheme.muted}`}>
                    Structure the service information before publishing it to the admin workflow.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium">
                    Service name
                    <input
                      type="text"
                      placeholder="Example: IT Support"
                      className={`w-full rounded-md border px-3 py-2 outline-none transition-colors focus:ring-2 focus:ring-sky-500 ${pageTheme.field}`}
                    />
                  </label>

                  <label className="space-y-2 text-sm font-medium">
                    Category
                    <input
                      type="text"
                      placeholder="Hardware, software, facilities"
                      className={`w-full rounded-md border px-3 py-2 outline-none transition-colors focus:ring-2 focus:ring-sky-500 ${pageTheme.field}`}
                    />
                  </label>

                  <label className="space-y-2 text-sm font-medium md:col-span-2">
                    Description
                    <textarea
                      rows="5"
                      placeholder="Write a short description of the service and how the team should handle it."
                      className={`w-full rounded-md border px-3 py-2 outline-none transition-colors focus:ring-2 focus:ring-sky-500 ${pageTheme.field}`}
                    />
                  </label>

                  <label className="space-y-2 text-sm font-medium">
                    SLA target
                    <input
                      type="text"
                      placeholder="24 hours"
                      className={`w-full rounded-md border px-3 py-2 outline-none transition-colors focus:ring-2 focus:ring-sky-500 ${pageTheme.field}`}
                    />
                  </label>

                  <label className="space-y-2 text-sm font-medium">
                    Owner team
                    <input
                      type="text"
                      placeholder="Support operations"
                      className={`w-full rounded-md border px-3 py-2 outline-none transition-colors focus:ring-2 focus:ring-sky-500 ${pageTheme.field}`}
                    />
                  </label>
                </div>
              </article>

              <aside className={`rounded-2xl border ${pageTheme.border} ${pageTheme.panel} p-6 shadow-sm`}>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Quick checklist</h2>
                  <p className={`text-sm ${pageTheme.muted}`}>
                    A small guide for keeping service entries consistent.
                  </p>
                </div>

                <ul className={`mt-6 space-y-3 text-sm ${pageTheme.muted}`}>
                  <li className="rounded-lg border px-4 py-3">Use a short, readable service title.</li>
                  <li className="rounded-lg border px-4 py-3">Keep the description focused on what the service does.</li>
                  <li className="rounded-lg border px-4 py-3">Assign one owning team before publishing.</li>
                  <li className="rounded-lg border px-4 py-3">Set a realistic SLA target for response time.</li>
                </ul>
              </aside>
            </section>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/public";

interface SidebarItem {
  href: string;
  label: string;
  svgPath: string;
  section?: string; // Para agrupar secciones opcionales
}

const sidebarItems: SidebarItem[] = [
  { section: "Principal", href: "/", label: "Anexos", svgPath: "M4 12L12 4l8 8M6 10.5V19a1 1 0 001 1h3v-3a1 1 0 011-1h2a1 1 0 011 1v3h3a1 1 0 001-1v-8.5" },
  { href: "/", label: "Listados", svgPath: "M4 6h16M4 12h16m-7 6h7" },
  { href: "/", label: "Control", svgPath: "M12 4.5V19m0-14.5c4.142 0 7.5 3.358 7.5 7.5S16.142 19.5 12 19.5M12 4.5c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5m6.364-12.05l-2.121-2.121m-8.486 0L4.95 9.95m12.05 4.243 2.121 2.121m-12.728 0 2.121-2.121" },
  { href: "/", label: "Productos", svgPath: "M3 10.75l9-4.5 9 4.5-9 4.5-9-4.5Zm0 4.5l9 4.5 9-4.5m-9-4.5V4.5" },
  { section: "Administrar", href: "/agenda", label: "Agenda", svgPath: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Z" },
  { href: "/", label: "Comunidad", svgPath: "M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" },
  { href: "/", label: "Configuración", svgPath: "M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" },
];

export default function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-30 w-64 h-screen pt-20 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        {/* Logo */}
        <div className="flex justify-center items-center mb-6">
          <Image
            src={Logo}
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>
        {/* Sidebar Items */}
        <ul className="space-y-2 font-medium">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.section && (
                <span className="text-gray-900 ms-3 dark:text-white">
                  {item.section}
                </span>
              )}
              <Link href={item.href}>
                <li>
                  <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white group-hover:text-D0298A"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.svgPath}
                      />
                    </svg>
                    <span className="text-gray-900 ms-3 dark:text-white group-hover:text-D0298A">
                      {item.label}
                    </span>
                  </a>
                </li>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// components/LogoutAlert.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface LogoutAlertProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutAlert({ onConfirm, onCancel }: LogoutAlertProps) {
  const [mounted, setMounted] = useState(false);

  // Sólo renderizamos en cliente y tras el primer montaje
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          ¿Estás seguro de cerrar sesión?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Sí
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

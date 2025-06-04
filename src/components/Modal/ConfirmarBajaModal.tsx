
"use client";

import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface ConfirmarBajaModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
  children?: React.ReactNode;
}

export default function ConfirmarBajaModal({
  isOpen,
  onCancel,
  onConfirm,
  title,
  message,
  loading = false,
  children,
}: ConfirmarBajaModalProps) {
  return (
    <Dialog open={isOpen} onClose={onCancel} as={Fragment}>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <Dialog.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative">
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
          >
            <IoClose className="text-2xl" />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <FaExclamationTriangle className="text-red-600 dark:text-red-400 text-xl" />
            <Dialog.Title className="text-lg font-bold text-gray-800 dark:text-white">
              {title}
            </Dialog.Title>
          </div>

          <Dialog.Description className="text-sm text-gray-600 dark:text-gray-300">
            {message}
          </Dialog.Description>

          {children && <div className="mt-4">{children}</div>}

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Dar de baja"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

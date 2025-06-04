

"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { darDeBajaMobiliario } from "@/services/mobiliarioService";

interface ConfirmarBajaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ConfirmarBajaModal({
  isOpen,
  onClose,
  onSuccess,
}: ConfirmarBajaModalProps) {
  const [inputID, setInputID] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!inputID.trim()) {
      toast.error("Ingresá un ID válido");
      return;
    }

    try {
      setLoading(true);
      await darDeBajaMobiliario(inputID);
      toast.success("Mobiliario dado de baja correctamente");
      setInputID("");
      onClose();
      onSuccess();
    } catch (error) {
      toast.error("No se pudo dar de baja el mobiliario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <FaTimes />
              </button>

              <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Dar de baja un mobiliario
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Ingresá el ID del mobiliario que deseás dar de baja
              </Dialog.Description>

              <input
                type="text"
                value={inputID}
                onChange={(e) => setInputID(e.target.value)}
                className="w-full mt-2 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white"
                placeholder="ID del mobiliario"
              />

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Dar de baja"}
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
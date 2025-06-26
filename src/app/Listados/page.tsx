
"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { obtenerUltimosMobiliarios, eliminarMobiliario } from "@/services/mobiliarioService";
import type { MobiliarioUltimo } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Wrapper, ConfirmModal } from "@/components";

function parseResol(res: string | null) {
  if (!res) return { numero: "", tipo: "" };
  const match = res.match(/Resol Nº(\S+)\s*(.*)/);
  return match ? { numero: match[1] || "", tipo: match[2] || "" } : { numero: "", tipo: "" };
}

export default function Listings() {
  const [lista, setLista] = useState<(MobiliarioUltimo & { id: string })[]>([]);
  const [selected, setSelected] = useState<(MobiliarioUltimo & { id: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    obtenerUltimosMobiliarios()
      .then((data) => {
        const normalizado = data.map((d) => ({ ...d, id: d.id_mobiliario }));
        setLista(normalizado);
        if (normalizado.length) setSelected(normalizado[0]);
      })
      .catch(() => toast.error("Error al cargar datos"))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = useMemo(() => {
    const term = busqueda.toLowerCase();
    return lista.filter(
      (i) =>
        i.descripcion.toLowerCase().includes(term) ||
        i.id.toLowerCase().includes(term)
    );
  }, [lista, busqueda]);

  const handleDelete = async () => {
    if (!selected) return;
    try {
      setDeleting(true);
      await eliminarMobiliario(selected.id);
      setLista((prev) => prev.filter((m) => m.id !== selected.id));
      setSelected(null);
      toast.success("Eliminado correctamente");
    } catch {
      toast.error("Error al eliminar");
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <Wrapper>
      <Toaster />
      <h1 className="text-2xl md:text-3xl font-bold text-center my-6 text-blue-700">
        Gestión de Mobiliario
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : !lista.length ? (
        <p className="text-center text-gray-500">No hay registros</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 w-full px-4 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
          <Card className="w-full lg:w-1/2">
            <CardHeader>
              <CardTitle>Listado</CardTitle>
              <Input
                placeholder="Buscar por ID o descripción"
                className="mt-2"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[440px] sm:h-[500px]">
                <ul className="space-y-2">
                  {filtrados.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => setSelected(item)}
                      className={`p-2 cursor-pointer rounded text-sm transition ${
                        selected?.id === item.id
                          ? "bg-blue-100 dark:bg-cyan-700"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <p className="font-medium truncate text-gray-800 dark:text-white">
                        {item.descripcion || "Sin descripción"}
                      </p>
                      <p className="text-xs text-gray-500">ID: {item.id}</p>
                    </li>
                  ))}
                  {!filtrados.length && (
                    <li className="text-center text-gray-500 text-sm">Sin resultados</li>
                  )}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="w-full lg:w-1/2">
            <CardHeader>
              <CardTitle>Detalle</CardTitle>
            </CardHeader>
            <CardContent>
              {selected ? (
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    {selected.foto_url ? (
                      <Image
                        src={selected.foto_url}
                        alt="Foto"
                        width={200}
                        height={200}
                        className="object-cover rounded-lg shadow"
                      />
                    ) : (
                      <div className="w-48 h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-500 text-sm">
                        Sin foto
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div><strong>ID:</strong> {selected.id}</div>
                    <div><strong>Clase:</strong> {selected.clase_bien || "—"}</div>
                    <div><strong>Rubro:</strong> {selected.rubro || "—"}</div>
                    <div><strong>Anexo:</strong> {selected.anexo}</div>
                    <div><strong>Subdependencia:</strong> {selected.subdependencia}</div>
                    <div className="sm:col-span-2"><strong>Descripción:</strong> {selected.descripcion}</div>
                    {(() => {
                      const { numero, tipo } = parseResol(selected.resolucion);
                      return (
                        <>
                          <div><strong>Resol Nº:</strong> {numero || "—"}</div>
                          <div><strong>Tipo:</strong> {tipo || "—"}</div>
                        </>
                      );
                    })()}
                    <div><strong>Estado:</strong> {selected.estado_conservacion || "—"}</div>
                    <div><strong>Fecha res.:</strong> {selected.fecha_resolucion || "—"}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4 w-full">
                    <Link href={`/patrimonio/editar/${selected.id}`} passHref className="w-full sm:w-auto">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 w-full sm:w-auto">
                        <FaEdit className="mr-2" /> Editar
                      </Button>
                    </Link>
                    <Button
                      variant="destructive"
                      onClick={() => setShowConfirm(true)}
                      className="w-full sm:w-auto"
                    >
                      <FaTrash className="mr-2" /> Eliminar
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Seleccioná un mobiliario.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="¿Eliminar mobiliario?"
        message="Esta acción no se puede deshacer."
      />
    </Wrapper>
  );
}

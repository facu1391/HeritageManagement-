
// services/permisosService.ts

const permisosMock: { [id: string]: boolean[][] } = {
  "7": [[true, false, false, false], [true, true, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]],
  "8": [[true, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]],
};

export async function obtenerPermisosUsuario(id: string): Promise<boolean[][]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(permisosMock[id] || Array(5).fill(Array(4).fill(false)));
    }, 300);
  });
}

export async function guardarPermisosUsuario(id: string, permisos: boolean[][]): Promise<void> {
  return new Promise((resolve) => {
    permisosMock[id] = permisos;
    setTimeout(() => resolve(), 300);
  });
}

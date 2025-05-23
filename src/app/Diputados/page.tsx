
import { Wrapper, DiputadoCard, diputadosData } from "@/components";

export default function Diputados() {
  return (
    <div>
       <Wrapper>
            <div className="flex justify-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white my-6 text-center">
                Bienvenido a la página de Diputados
                </h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                {diputadosData.map((diputado, index) => (
                <DiputadoCard key={index} {...diputado} />
                ))}
            </div>
       </Wrapper>
    </div>
  );
}
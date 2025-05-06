
import { Wrapper } from "@/components";
import { Card } from "@/components/Card/Card";
import { Anexo1, CasaCentral, Muni, Anexo3, Rivadavia, Urquiza, Santafe, Observatorio } from "@/public";

export default function Annexes() {
  return (
    <Wrapper>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Bienvenido a la página de Anexos
        </h1>
        <div className="flex flex-wrap gap-6 justify-center">
          <Card 
            title="Casa Central" 
            imageSrc={CasaCentral} 
            description="Descripción breve del primer anexo." 
            href="/Anexos/CasaCentral" // Nueva ruta
          />
          <Card 
            title="Anexo 1" 
            imageSrc={Anexo1} 
            description="Copiapo N 110" 
            href="/Anexos/Anexo-1" // Nueva ruta
          />
          <Card 
            title="Anexo 2" 
            imageSrc={Muni} 
            description="Santa fe N 627" 
            href="/Anexos/Anexo-2" // Nueva ruta
          />
          <Card 
            title="Anexo 3" 
            imageSrc={Anexo3} 
            description="Dalacio velez N 765" 
            href="/Anexos/Anexo-3" // Nueva ruta
          />
            <Card 
            title="Anexo rivadavia" 
            imageSrc={Rivadavia} 
            description="Rivadavia N 938" 
            href="/Anexos/Anexo-Rivadavia" // Nueva ruta
          />
            <Card 
            title="Anexo santafe" 
            imageSrc={Santafe} 
            description="Descripción breve del cuarto anexo." 
            href="/Anexos/Anexo-Santafe" // Nueva ruta
          />
            <Card 
            title="Anexo V" 
            imageSrc={Urquiza} 
            description="Urquiza N 435" 
            href="/Anexos/Anexo-Urquiza" // Nueva ruta
          />
           <Card 
            title="Anexo V" 
            imageSrc={Observatorio} 
            description="Urquiza N 435" 
            href="/Anexos/Observatorio" // Nueva ruta
          />
        </div>
      </div>
    </Wrapper>
  );
}

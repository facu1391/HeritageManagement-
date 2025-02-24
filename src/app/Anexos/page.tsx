
import { Wrapper } from "@/components";
import { Card } from "@/components/Card/Card";
import {  Anexo1, CasaCentral, Muni } from "@/public";

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
          />
          <Card 
            title="Anexo 1" 
            imageSrc={Anexo1} 
            description="Descripción breve del segundo anexo." 
          />
           <Card 
            title="Anexo 2" 
            imageSrc={Muni} 
            description="Descripción breve del cuarto anexo." 
          />
        </div>
      </div>
    </Wrapper>
  );
}

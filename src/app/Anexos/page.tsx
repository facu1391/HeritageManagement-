
import { Wrapper } from "@/components";
import { Card } from "@/components/Card/Card";

export default function Annexes() {
  return (
    <Wrapper>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Bienvenido a la página de Anexos
        </h1>
        <div className="flex flex-wrap gap-6 justify-center">
          <Card 
            title="Anexo 1" 
            imageSrc="/img/anexo1.jpg" 
            description="Descripción breve del primer anexo." 
          />
          <Card 
            title="Anexo 2" 
            imageSrc="/img/anexo2.jpg" 
            description="Descripción breve del segundo anexo." 
          />
           <Card 
            title="Anexo 3" 
            imageSrc="/img/anexo3.jpg" 
            description="Descripción breve del tercer anexo." 
          />
           <Card 
            title="Anexo 4" 
            imageSrc="/img/anexo4.jpg" 
            description="Descripción breve del cuarto anexo." 
          />
        </div>
      </div>
    </Wrapper>
  );
}

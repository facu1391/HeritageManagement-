import { Wrapper } from "@/components";

export default function Home() {
  return (
    <div>
       <Wrapper>
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Bienvenido a la página principal
            </h1>  
          </div>
       </Wrapper>
    </div>
  );
}

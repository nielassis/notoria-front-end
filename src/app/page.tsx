import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/landingPage/footer";
import FunctionsCard from "@/components/ui/landingPage/landingPageCards";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen gap-16">
      <div className="w-full">
        <Header />
      </div>
      <section>
        <div className="justify-center text-center flex flex-col gap-8">
          <span className="text-emerald-500 font-semibold">
            Plataforma educacional completa
          </span>

          <h1 className="text-5xl font-bold">
            Transforme a gestão
            <br />
            educacional com{" "}
            <span
              className="text-5xl font-bold text-emerald-500"
              style={{ fontFamily: "Euphoria Script, cursive" }}
            >
              Notoria
            </span>
          </h1>

          <h2 className="text-md text-gray-600">
            A plataforma que conecta professores e alunos de forma inteligente.
            Gerencie turmas, <br />
            acompanhe o progresso e facilite a comunicação em um só lugar.
          </h2>
        </div>

        <div className="justify-center items-center py-16">
          <FunctionsCard />
        </div>
      </section>
      <section className="flex flex-col bg-emerald-500 w-full h-auto">
        <div className="p-8 flex gap-6 flex-col items-center justify-center text-center">
          <h1 className="font-bold text-2xl text-white">
            Pronto para revolucionar sua educação?
          </h1>
          <span className="text-white font-light mt-2">
            Junte-se a milhares de educadores que já transformaram sua <br />{" "}
            forma de ensinar com Notoria
          </span>

          <Button className="bg-white hover:bg-opacity/80 text-emerald-500">
            <Link href="/login">Começar Grátis</Link>
          </Button>
        </div>

        <Footer />
      </section>
    </div>
  );
}

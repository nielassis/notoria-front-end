import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-emerald-400" />
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "Euphoria Script, cursive" }}
              >
                Notoria
              </span>
            </div>
            <p className="text-gray-400">
              Transformando a educação através da tecnologia
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Documentação
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Carreiras
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Notoria. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

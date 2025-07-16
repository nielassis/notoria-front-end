import {
  TrendingUp,
  LucideIcon,
  Users,
  UserPlus,
  BarChart3,
  FileTextIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

export default function FunctionsCard() {
  interface FunctionInterface {
    icon: LucideIcon;
    title: string;
    desc: string;
  }

  const teacherFunctions: FunctionInterface[] = [
    {
      icon: Users,
      title: "Gestão de Turmas",
      desc: "Crie e organize múltiplas turmas com facilidade.",
    },
    {
      icon: UserPlus,
      title: "Pré-registro de alunos",
      desc: "Pré-registre seus alunos e acompanhe o progresso individual.",
    },
    {
      icon: TrendingUp,
      title: "Acompanhamento de Progresso",
      desc: "Monitore o desempenho e as notas de seus alunos.",
    },
  ];

  const studentFunctions: FunctionInterface[] = [
    {
      icon: BarChart3,
      title: "Progresso Pessoal",
      desc: "Acompanhe seu desenvolvimento na plataforma.",
    },
    {
      icon: FileTextIcon,
      title: "Notas e Atividades",
      desc: "Veja suas notas e acompanhe suas tarefas facilmente.",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center gap-8 px-4">
      <h1 className="text-4xl font-bold text-gray-950">
        Funcionalidades Poderosas
      </h1>
      <span className="text-md text-gray-600 max-w-2xl">
        Tudo que você precisa para uma gestão educacional eficiente e moderna.
      </span>

      <div className="py-4 w-full">
        <div className="w-fit mx-auto px-4 py-1 bg-emerald-500 text-white rounded-full">
          <h3 className="font-bold text-sm">Para Professores</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {teacherFunctions.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="text-left shadow-md hover:shadow-lg transition"
            >
              <CardHeader className="flex flex-col items-start gap-2">
                <Icon className="h-8 w-8 text-emerald-500" />
                <CardTitle className="font-bold text-xl">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-md">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="py-4 w-full">
        <div className="w-fit mx-auto px-4 py-1 bg-emerald-500 text-white rounded-full">
          <h3 className="font-bold text-sm">Para Alunos</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {studentFunctions.map(({ icon: Icon, title, desc }) => (
            <Card
              key={title}
              className="text-left shadow-md hover:shadow-lg transition"
            >
              <CardHeader className="flex flex-col items-start gap-2">
                <Icon className="h-8 w-8 text-emerald-500" />
                <CardTitle className="font-bold text-xl">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-md">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { formatDate } from "@/utils/formatDate";

interface PendingActivityCardProps {
  title: string;
  type: string;
  deadline: string;
}

export function PendingActivityCard({
  title,
  type,
  deadline,
}: PendingActivityCardProps) {
  const deadlineDate = parseISO(deadline);
  const today = new Date();
  const daysDiff = differenceInCalendarDays(deadlineDate, today);

  console.log(deadline);

  return (
    <Card className="flex flex-row items-center justify-between px-6 py-4 border border-orange-200 bg-orange-50 rounded-2xl shadow-sm">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-orange-900">{title}</h3>
        <Badge className="w-fit bg-orange-100 text-orange-800 text-xs shadow-none">
          {type === "ASSIGNMENT"
            ? "ATIVIDADE"
            : type === "EXERCISE"
            ? "EXERCÍCIO"
            : "MATERIAL COMPLEMENTAR"}
        </Badge>
      </div>
      <div className="text-right">
        {daysDiff < 0 ? (
          <p className="text-sm text-orange-600 font-semibold">
            Atrasado há {Math.abs(daysDiff)} dias
          </p>
        ) : (
          <>
            <p className="text-sm text-orange-600 font-semibold">Prazo:</p>
            <p className="text-base font-bold text-orange-800">
              {formatDate(deadline, "DD MM YY")}
            </p>
          </>
        )}
      </div>
    </Card>
  );
}

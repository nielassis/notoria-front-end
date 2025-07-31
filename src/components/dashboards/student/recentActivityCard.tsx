import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentActivityCardProps {
  title: string;
  type: string;
  grade: number;
  timeAgo: string;
}

export function RecentActivityCard({
  title,
  type,
  grade,
  timeAgo,
}: RecentActivityCardProps) {
  return (
    <Card className="flex flex-row items-center justify-between px-6 py-4 rounded-2xl shadow-sm">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <Badge variant="secondary" className="w-fit text-xs">
          {type === "ASSIGNMENT"
            ? "ATIVIDADE"
            : type === "EXERCISE"
            ? "EXERCÍCIO"
            : "MATERIAL COMPLEMENTAR"}
        </Badge>
      </div>
      <div className="text-right">
        <p className="text-green-600 font-bold text-lg">{grade}</p>
        <p className="text-xs text-muted-foreground">{timeAgo}</p>
      </div>
    </Card>
  );
}

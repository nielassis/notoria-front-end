import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface StudentClassroomCardProps {
  subject: string;
  status?: string;
}

export function StudentClassroomCard({ subject }: StudentClassroomCardProps) {
  return (
    <Card className="w-full max-w-xs shadow-sm border rounded-xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{subject}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-2"></CardContent>
    </Card>
  );
}

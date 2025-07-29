"use client";

import { useEffect, useState } from "react";
import { getSubmissionsByActivityId } from "@/actions/teacher/acivities/submissions/getSubmissionsByActivityId";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/getInitials";

interface Props {
  activityId: string;
}

export default function GradesTab({ activityId }: Props) {
  const [gradedSubmissions, setGradedSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getSubmissionsByActivityId(activityId, token).then((res) => {
      if (res.success) {
        const filtered = res.data.graded.filter(
          (submission) =>
            submission.status === "COMPLETED" && submission.grade !== null
        );
        setGradedSubmissions(filtered);
      }
      setIsLoading(false);
    });
  }, [activityId]);

  if (isLoading) return <p>Carregando notas...</p>;

  if (gradedSubmissions.length === 0)
    return <p>Nenhuma avaliação finalizada ainda.</p>;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-950">Resumo das avaliações</p>
      </div>

      <div className="space-y-3">
        {gradedSubmissions.map((submission) => {
          const formattedDate = new Date(submission.submittedAt).toLocaleString(
            "pt-BR",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          );

          return (
            <div
              key={submission.id}
              className="flex items-center text-black justify-between bg-white rounded-lg border px-4 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 text-sm">
                  <AvatarFallback>
                    {getInitials(submission.student.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{submission.student.name}</p>
                  <p className="text-sm">Entregue: {formattedDate}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-semibold text-lg">
                  {submission.grade?.toFixed(1)}
                </p>
                <p className="text-sm">de 10</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

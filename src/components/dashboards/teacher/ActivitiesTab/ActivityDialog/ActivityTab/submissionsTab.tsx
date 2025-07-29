"use client";

import { useEffect, useState, startTransition } from "react";
import { getSubmissionsByActivityId } from "@/actions/teacher/acivities/submissions/getSubmissionsByActivityId";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/getInitials";
import SubmissionDialog from "./submissionDialog";

interface Props {
  activityId: string;
}

export default function SubmissionsTable({ activityId }: Props) {
  const [submissions, setSubmissions] = useState<
    (Submission | ActivitySubmission)[]
  >([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    startTransition(async () => {
      const response = await getSubmissionsByActivityId(activityId, token);
      if (response.success) {
        const all = [...response.data.graded, ...response.data.pending];
        setSubmissions(all);
      }
    });
  }, [activityId]);

  const getStatus = (submission: Submission | ActivitySubmission) => {
    if ("grade" in submission && submission.grade != null) return "Avaliado";
    if (submission.status === "COMPLETED") return "Enviado";
    return "Pendente";
  };

  const statusClass = (status: string) => {
    return cn(
      "px-2 py-1 text-xs font-semibold rounded-full",
      status === "Avaliado" && "bg-green-100 text-green-600",
      status === "Enviado" && "bg-blue-100 text-blue-600",
      status === "Pendente" && "bg-orange-100 text-orange-600"
    );
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[700px] text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Data de Entrega</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Nota</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => {
            const status = getStatus(submission);
            return (
              <TableRow key={submission.id}>
                <TableCell className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {getInitials(submission.student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{submission.student.name}</span>
                </TableCell>
                <TableCell>
                  {submission.submittedAt
                    ? new Date(submission.submittedAt).toLocaleString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <span className={statusClass(status)}>{status}</span>
                </TableCell>
                <TableCell>
                  {submission.grade != null ? submission.grade.toFixed(1) : "-"}
                </TableCell>
                <TableCell>
                  <SubmissionDialog submissionId={submission.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

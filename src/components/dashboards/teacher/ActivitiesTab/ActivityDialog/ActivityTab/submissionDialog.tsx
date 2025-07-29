import {
  getSubmissionById,
  SubmissionResponse,
} from "@/actions/teacher/acivities/submissions/getSubmissionById";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import GradeForm from "./gradeSubmissionForm";
import { patchGradeInSubmission } from "@/actions/teacher/acivities/submissions/patchGradeInSubmission";
import { Card } from "@/components/ui/card";

interface SubmissionDialogProps {
  submissionId: string;
}

export default function SubmissionDialog({
  submissionId,
}: SubmissionDialogProps) {
  const [submission, setSubmission] = useState<SubmissionResponse | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getSubmissionById({ submissionId, token }).then((res) => {
      if (res) {
        setSubmission(res);
      }
    });
  }, [submissionId]);

  async function handleGradeSubmit(grade: number) {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await patchGradeInSubmission({
      submissionId,
      token,
      grade,
    });

    if (response.success) {
      window.location.reload();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-1" /> Ver
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Entrega – {submission?.student.name ?? "Carregando..."}
          </DialogTitle>
          {submission?.submittedAt && (
            <p className="text-sm text-gray-400 mt-1">
              Entregue em:{" "}
              {new Date(submission.submittedAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </DialogHeader>

        {submission ? (
          <div className="space-y-4 mt-4">
            <div>
              <strong>Conteúdo da Entrega:</strong>
              <div className="bg-gray-100 rounded-md p-3 mt-1 whitespace-pre-line text-sm">
                {submission.content || "Nenhum conteúdo enviado."}
              </div>
            </div>

            <Card className="flex flex-col items-center justify-center w-full max-w-md mx-auto  px-6 py-4 rounded-xl shadow-md mt-6">
              <GradeForm
                initialGrade={submission?.grade ?? undefined}
                onSubmit={handleGradeSubmit}
              />
            </Card>
          </div>
        ) : (
          <p>Carregando entrega...</p>
        )}
      </DialogContent>
    </Dialog>
  );
}

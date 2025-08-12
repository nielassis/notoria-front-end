import { getActivityById } from "@/actions/student/activities/getActivityById";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenBoxIcon } from "lucide-react";
import React, { startTransition, useEffect, useState } from "react";
import ActivitySubmissionForm from "./activitySubmissionForm";
import { Separator } from "@/components/ui/separator";

type Props = {
  activityId: string;
};

export default function ActivityInstuctionsDialog({ activityId }: Props) {
  const [activity, setActivity] = useState<StudentActivityById>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    startTransition(async () => {
      const response = await getActivityById({ activityId, token });
      if (response) setActivity(response);
    });
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="w-full bg-emerald-500 hover:bg-emerald-600"
        >
          <PenBoxIcon className="mr-2" size={16} />
          Ver Instruções
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full flex flex-col max-w-[90vw] md:max-w-[80vw] max-h-screen overflow-y-auto px-4 py-6 rounded-xl">
        <DialogTitle>Instruções da Atividade - {activity?.title}</DialogTitle>

        <div className="bg-[#1f2937] text-white rounded-lg p-4 max-h-64 overflow-y-auto text-sm leading-relaxed shadow-sm">
          <p className="font-semibold mb-1">Instruções da Atividade:</p>
          <p>
            {activity?.description?.trim() ||
              "Nenhuma instrução disponível para essa atividade no momento."}
          </p>
        </div>
        <Separator orientation="horizontal" className="w-full" />
        <h1 className="text-lg font-semibold">Entrega</h1>

        <ActivitySubmissionForm activityId={activityId} />
      </DialogContent>
    </Dialog>
  );
}

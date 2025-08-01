import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const gradeSchema = z.object({
  grade: z
    .number()
    .min(1, { message: "Nota mínima é 1" })
    .max(10, { message: "Nota máxima é 10" }),
});

type GradeFormData = z.infer<typeof gradeSchema>;

interface GradeFormProps {
  submited: string;
  initialGrade?: number;
  onSubmit: (grade: number) => void;
}

export default function GradeForm({
  initialGrade,
  onSubmit,
  submited,
}: GradeFormProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GradeFormData>({
    resolver: zodResolver(gradeSchema),
    defaultValues: { grade: initialGrade ?? undefined },
  });

  const selectedGrade = watch("grade");

  function handleClick(grade: number) {
    setValue("grade", grade, { shouldValidate: true });
  }

  function onSubmitForm(data: GradeFormData) {
    onSubmit(data.grade);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="flex flex-col  gap-4 w-full max-w-sm"
      role="radiogroup"
      aria-label="Avaliação da atividade"
    >
      <p className="text-lg font-semibold mb-2">Nota: </p>

      <div className="flex gap-2">
        {[...Array(10)].map((_, i) => {
          const grade = i + 1;
          const isSelected = grade === selectedGrade;
          return (
            <button
              key={grade}
              type="button"
              onClick={() => handleClick(grade)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              className={`
            w-10 h-10 rounded-md border flex items-center justify-center
            font-medium text-sm
            transition-colors duration-200
            cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1
            ${
              isSelected
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }
          `}
            >
              {grade}
            </button>
          );
        })}
      </div>

      {errors.grade && (
        <p className="text-red-600 text-sm mt-1" role="alert">
          {errors.grade.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={
          selectedGrade === undefined || isSubmitting || submited === "PENDING"
        }
        className="bg-emerald-500 hover:bg-emerald-600 px-6 py-2"
      >
        <Star className="mr-1" />
        {isSubmitting ? "Salvando..." : "Salvar Avaliação"}
      </Button>
    </form>
  );
}

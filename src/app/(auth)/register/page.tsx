import RegisterTeacherForm from "@/components/loginPage/registerTeacherForm";
import React from "react";

export default function RegisterTeacher() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold text-center">Cadastro de Professor</h1>
      <p className="text-md text-gray-500 text-center mb-4">
        Preencha os dados abaixo para criar sua conta.
      </p>

      <RegisterTeacherForm />
    </div>
  );
}

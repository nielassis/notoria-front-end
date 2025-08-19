"use client";

import StudentChangePasswordForm from "@/components/profile/student/changePasswordForm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/authContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getInitials } from "@/utils/getInitials";
import { Lock, Shield } from "lucide-react";
import React from "react";

export default function StudentProfilePage() {
  useProtectedRoute("student");
  const { name, role, email } = useAuth();
  const initials = name ? getInitials(name) : "??";

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Configurações do perfil</h1>
        <p className="text-md text-gray-500">
          Gerencie suas configurações de segurança
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center space-y-6 md:col-span-1">
          <div className="text-center">
            <h2 className="text-xl font-bold">Meu Perfil</h2>
            <p className="text-gray-500 text-sm">Suas informações pessoais</p>
          </div>

          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="text-lg font-semibold">{name ?? ""}</h3>
            <p className="text-gray-500">{role === "student" && "Aluno"}</p>
          </div>

          <div className="w-full space-y-4 text-left">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-sm">{email}</p>
            </div>
          </div>

          <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
            <p>
              ℹ️ Para alterar suas informações pessoais, entre em contato com o
              professor responsável.
            </p>
          </div>
        </Card>

        <Card className="p-6 space-y-6 md:col-span-2">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-600" />
              Alterar Senha
            </h2>
            <p className="text-gray-500 text-sm">
              Mantenha sua conta segura com uma senha forte
            </p>
          </div>

          <div className="space-y-4 w-full flex items-center justify-center">
            <StudentChangePasswordForm />
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
            <p className="font-medium text-green-600 flex items-center">
              <Shield className="h-4 w-4 mr-2" /> Dicas para uma senha segura:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Use pelo menos 8 caracteres</li>
              <li>Combine letras maiúsculas e minúsculas</li>
              <li>Inclua números e símbolos</li>
              <li>Evite informações pessoais óbvias</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

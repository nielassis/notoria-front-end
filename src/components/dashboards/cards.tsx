"use client";

import { LucideIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashBoardCardsProps {
  title: string;
  type: "normal" | "pending";
  icon: LucideIcon;
  action(): string | number | Promise<string | number>;
}

export default function DashBoardCards({
  title,
  icon: Icon,
  type,
  action,
}: DashBoardCardsProps) {
  const [result, setResult] = useState<string | number>("...");

  useEffect(() => {
    const execute = async () => {
      const res = await action();
      setResult(res);
    };

    execute();
  }, [action]);

  return (
    <Card className="flex-1 cursor-pointer">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon
          size={20}
          className={cn(
            "mt-1",
            type === "normal" ? "text-emerald-500" : "text-orange-500"
          )}
        />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">{result}</div>
      </CardContent>
    </Card>
  );
}

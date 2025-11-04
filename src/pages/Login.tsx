import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type LoginPageProps = {
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  redirectUrl?: string; // rota padrão (ex: /home)
  className?: string;
};

export default function LoginPage({
  title = "Bem-vindo",
  subtitle = "Faça login para continuar",
  buttonLabel = "Entrar",
  redirectUrl = "/home",
  className,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setError("Digite um email válido.");
      return;
    }
    if (!password.trim()) {
      setError("Digite sua senha.");
      return;
    }

    // 👇 valida admin fixo
    if (
      email === "aconhegocafe0@gmail.com" &&
      password === "aconchegocafe123"
    ) {
      localStorage.setItem("isAdminLogged", "true"); // salva login no localStorage
      window.location.href = "/admin";
      return;
    }

    setError("Email ou senha incorretos.");
  };

  return (
    <div
      className={cn(
        "flex h-screen w-full items-center justify-center bg-gray-50",
        className
      )}
    >
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button onClick={handleLogin} className="w-full">
            {buttonLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

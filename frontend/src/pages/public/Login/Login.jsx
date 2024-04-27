import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

// import logger from "@/lib/logger";
import api from "@/services/api";

function desactive(){
    var mainElement = document.querySelector('.container');
  mainElement.classList.remove('active'); 
  }

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dados = { usuario, senha };

    try {
      const response = await api.post("login", dados);
      console.log(response);
      alert(response.data.token); // Assumindo que a resposta possui uma propriedade "data" com a informação desejada
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <main className="h-screen flex w-full">
      <div className="flex items-center justify-center bg-slate-50 h-screen w-screen">
        <Card className="w-96 h-96">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Entre com sua conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div>
                <Label>Usuário</Label>
                <Input
                  placeholder="Insira seu usuário"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                ></Input>
              </div>
              <div className="mt-4">
                <Label>Senha</Label>
                <Input
                  placeholder="Insira sua senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                ></Input>
              </div>
              <Button type="submit" className="mt-6 w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Login;

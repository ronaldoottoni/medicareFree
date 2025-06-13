'use client'

import DashboardLayout from "@/components/layout/Layout"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function CadastroCuidadoresPage() {
    const [cuidador, setCuidador] = useState({
        nome: "",
        email: "",
        telefone: "",
        senha: "",
    })

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const cadastrar = async () => {
        const { nome, email, telefone, senha } = cuidador
        if (!nome || !email || !senha) {
            toast.warn("Nome, E-mail e senhaw são campos obrigatórios")
            return
        }

        try {
            await axios.post("http://localhost:8000/cuidadores/register", cuidador, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success("Cuidador cadastrado com sucesso")
            setCuidador({ nome: "", email: "", telefone: "", senha: "" })
        } catch {
            toast.error("Erro ao cadastrar Cuidador")
        }
    }
    return (
        <DashboardLayout>
            <h1 className="text-xl font-bold mb-4">Cadastro de Cuidador</h1>
            <div className="grid gap-4 max-w-md">
                <Input
                    placeholder="Nome"
                    value={cuidador.nome}
                    onChange={(e) => setCuidador({ ...cuidador, nome: e.target.value })}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={cuidador.email}
                    onChange={(e) => setCuidador({ ...cuidador, email: e.target.value })}
                />
                <Input
                    placeholder="Telefone"
                    value={cuidador.telefone}
                    onChange={(e) => setCuidador({ ...cuidador, telefone: e.target.value })}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={cuidador.senha}
                    onChange={(e) => setCuidador({ ...cuidador, senha: e.target.value })}
                />
                <Button onClick={cadastrar}>Cadastrar</Button>
            </div>
        </DashboardLayout>
    )
}
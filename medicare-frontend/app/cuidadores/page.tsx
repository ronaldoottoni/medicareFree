'use client'

import Layout from "@/components/layout/Layout"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import Label from "@/components/ui/Label"
import Card from "@/components/ui/Card"
import PageTitle from "@/components/ui/PageTitle"
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
            toast.warn("Nome, E-mail e senha são campos obrigatórios")
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
        <ProtectedRoute>
            <Layout>
                <Card>
                    <PageTitle className="grid gap-4 w-full max-w-md mx-auto">MediCare - Cadastrar Cuidador</PageTitle>
                    <div className="grid gap-4 max-w-md">
                        <Label>Nome Completo</Label>
                        <Input
                            placeholder="Nome Completo"
                            value={cuidador.nome}
                            onChange={(e) => setCuidador({ ...cuidador, nome: e.target.value })}
                        />
                        <Label>E-mail</Label>
                        <Input
                            type="email"
                            placeholder="E-mail"
                            value={cuidador.email}
                            onChange={(e) => setCuidador({ ...cuidador, email: e.target.value })}
                        />
                        <Label>Telefone Celular</Label>
                        <Input
                            placeholder="Telefone"
                            value={cuidador.telefone}
                            onChange={(e) => setCuidador({ ...cuidador, telefone: e.target.value })}
                        />
                        <Label>Senha</Label>
                        <Input
                            type="password"
                            placeholder="Senha"
                            value={cuidador.senha}
                            onChange={(e) => setCuidador({ ...cuidador, senha: e.target.value })}
                        />
                        <Button onClick={cadastrar}>Cadastrar Cuidador</Button>
                    </div>
                </Card>
            </Layout>
        </ProtectedRoute>
    )
}
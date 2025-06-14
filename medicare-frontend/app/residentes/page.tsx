'use client'

import axios from "axios"
import Layout from "@/components/layout/Layout"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import Card from "@/components/ui/Card"
import Label from "@/components/ui/Label"
import PageTitle from "@/components/ui/PageTitle"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import { toast } from "react-toastify"

export default function CadastroResidentesPage() {
    const [residente, setResidente] = useState({
        nome: "",
        data_nascimento: "",
        sexo: "",
        observacoes: ""
    })

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const cadastrarResidente = async () => {
        const { nome, data_nascimento, sexo, observacoes } = residente
        if (!nome || !data_nascimento || !sexo) {
            toast.warn("Preencha todos os campos obrigatórios")
            return
        }

         //console.log("Residente enviado:", residente)

        try {
            await axios.post("http://localhost:8000/residentes/register", residente, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success("Residente cadastrado com sucesso")
            setResidente({ nome: "", data_nascimento: "", sexo: "", observacoes: ""})
        } catch {
            toast.error("Erro ao cadastrar residente")
        }
    }

    return (
        <ProtectedRoute>
            <Layout>
                <Card>
                    <PageTitle>MediCare - Cadastrar Residente</PageTitle>
                    <Label>Nome Completo</Label>
                    <Input
                        placeholder="Nome completo"
                        value={residente.nome}
                        onChange={(e) => setResidente({ ...residente, nome: e.target.value })}
                    />

                    <Label>Data de nascimento</Label>
                    <Input
                        type="date"
                        value={residente.data_nascimento}
                        onChange={(e) => setResidente({ ...residente, data_nascimento: e.target.value })}
                    />

                    <Label>Sexo</Label>
                    <select
                        value={residente.sexo}
                        onChange={(e) => setResidente({ ...residente, sexo: e.target.value })}
                        className="mt-1 w-full border rounded px-3 py-2"
                    >
                        <option value="">Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>

                    <Label>Observações</Label>
                    <Input
                        placeholder="Observações (opcional)"
                        value={residente.observacoes}
                        onChange={(e) => setResidente({ ...residente, observacoes: e.target.value })}
                    />
                    <Button onClick={cadastrarResidente}> Cadastrar Residente </Button>
                </Card>
            </Layout>
        </ProtectedRoute>
    )
}

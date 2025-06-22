'use client'

import axios from "axios"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import Layout from "@/components/layout/Layout"
import Card from "@/components/ui/Card"
import Label from "@/components/ui/Label"
import PageTitle from "@/components/ui/PageTitle"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import { toast } from "react-toastify"

export default function CadastroMedicamentosPage() {
    const [medicamento, setMedicamento] = useState({
        nome: "",
        descricao: "",
        tipo: "",
        observacoes: ""
    })

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const cadastrarMedicamento = async () => {
        const { nome, descricao, tipo, observacoes } = medicamento
        if (!nome || !descricao || !tipo) {
            toast.warn("Preencha todos os campos obrogatórios")
            return
        }

        try {
            await axios.post("http://localhost:8000/medicamentos/register", medicamento, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success("Medicamento cadastrado com sucesso")
            setMedicamento({ nome: "", descricao: "", tipo: "", observacoes: "" })
        } catch {
            toast.error("Erro ao cadastrar medicamento")
        }
    }

    return (
        <ProtectedRoute>
            <Layout>
                <Card>
                    <PageTitle>MediCare - Cadastrar Medicamento</PageTitle>
                    <Label>Nome do Mecidamento</Label>
                    <Input
                        placeholder="Nome do Medicamento"
                        value={medicamento.nome}
                        onChange={(e) => setMedicamento({ ...medicamento, nome: e.target.value })}
                    />
                    <Label>Forma de Usar</Label>
                    <Input
                        placeholder="Informe a forma de usar"
                        value={medicamento.descricao}
                        onChange={(e) => setMedicamento({ ...medicamento, descricao: e.target.value })}
                    />
                    <Label>Tipo de Medicamento</Label>
                    <Input
                        placeholder="Injetável, Gotas, Comprimido, etc..."
                        value={medicamento.tipo}
                        onChange={(e) => setMedicamento({ ...medicamento, tipo: e.target.value })}
                    />
                    <Label>Observações</Label>
                    <Input
                        placeholder="Observações sobre o uso (opcional)"
                        value={medicamento.observacoes}
                        onChange={(e) => setMedicamento({ ...medicamento, observacoes: e.target.value })}
                    />
                    <Button onClick={cadastrarMedicamento}>Cadastrar Medicamento</Button>
                </Card>
            </Layout>
        </ProtectedRoute>
    )
}

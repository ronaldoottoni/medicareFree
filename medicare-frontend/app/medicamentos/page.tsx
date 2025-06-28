'use client'

import axios from "axios"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import Layout from "@/components/layout/Layout"
import Card from "@/components/ui/Card"
import Label from "@/components/ui/Label"
import PageTitle from "@/components/ui/PageTitle"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function CadastroMedicamentosPage() {
    const [medicamento, setMedicamento] = useState({
        nome: "",
        descricao: "",
        tipo: "",
        observacoes: ""
    })

    const [medicamentos, setMedicamentos] = useState<any[]>([])
    const [modoEdicao, setModoEdicao] = useState(false)
    const [idEdicao, setIdEdicao] = useState<number | null>(null)

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const buscarMedicamentos = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/medicamentos/listar`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setMedicamentos(res.data)
        } catch {
            toast.error("Erro ao buscar medicamentos")
        }
    }

    useEffect(() => {
        if (token) buscarMedicamentos()
    }, [token])

    const editarMedicamento = async (id: number) => {
        try {
            const res = await axios.get(`http://localhost:8000/medicamentos/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })

            setMedicamento({
                nome: res.data.nome || "",
                descricao: res.data.descricao || "",
                tipo: res.data.tipo || "",
                observacoes: res.data.observacoes || ""
            })

            setModoEdicao(true)
            setIdEdicao(id)
        } catch {
            toast.error("Erro ao carregar medicamento para edição")
        }
    }

    const salvarOuEditar = async () => {
        const { nome, descricao, tipo, observacoes } = medicamento
        if (!nome || !descricao || (!tipo && !modoEdicao)) {
            toast("Preencha todos os campos obrogatórios")
            return
        }

        try {
            if (modoEdicao && idEdicao !== null) {
                const payload = { nome, descricao, tipo, observacoes }

                await axios.put(`http://localhost:8000/medicamentos/${idEdicao}`, payload, {
                    headers: { Authorization: `Bearar ${token}` }
                })
                toast.success("Medicamento atualizado")
            } else {
                await axios.post("http://localhost:8000/medicamentos/register", medicamento, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                toast.success("Medicamento cadastrado com sucesso")
            }
            setMedicamento({ nome: "", descricao: "", tipo: "", observacoes: "" })
            setModoEdicao(false)
            setIdEdicao(null)
            buscarMedicamentos()
        } catch {
            toast.error("Erro ao cadastrar medicamento")
        }
    }

    const excluirMedicamento = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este medicamento?")) return
        try {
            await axios.delete(`http://localhost:8000/medicamentos/excluir/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Medicamento excluído com sucesso")
            buscarMedicamentos()
        } catch {
            toast.error("Erro ao excluir medicamento")
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
                    <Button onClick={salvarOuEditar}>Cadastrar Medicamento</Button>
                </Card>
                <br></br>
                <Card className="mt-8">
                    <PageTitle>Medicamentos Cadastrados</PageTitle>
                    <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#1f2937", color: "#fff" }}>
                                <th>Nome</th>
                                <th>Forma de Usar</th>
                                <th>Tipo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicamentos.map((c, i) => (
                                <tr key={c.id} style={{ backgroundColor: i % 2 === 0 ? "#374151" : "#4b5563", color: "#f1f5f9" }}>
                                    <td>{c.nome}</td>
                                    <td>{c.descricao}</td>
                                    <td>{c.tipo}</td>
                                    <td>
                                        <Button onClick={() => editarMedicamento(c.id)}>Editar</Button>
                                        <Button onClick={() => excluirMedicamento(c.id)} >Excluir</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </Layout>
        </ProtectedRoute>
    )
}

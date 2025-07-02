'use client'

import axios from "axios"
import DashboardLayout from "@/components/layout/DashboardLayout"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import Card from "@/components/ui/Card"
import Label from "@/components/ui/Label"
import PageTitle from "@/components/ui/PageTitle"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function CadastroResidentesPage() {
    const [residente, setResidente] = useState({
        nome: "",
        data_nascimento: "",
        sexo: "",
        observacoes: ""
    })

    const [residentes, setResidentes] = useState<any[]>([])
    const [modoEdicao, setModoEdicao] = useState(false)
    const [idEdicao, setIdEdicao] = useState<number | null>(null)

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const buscarResidentes = async () => {
        try {
            const res = await axios.get("http://localhost:8000/residentes/listar", {
                headers: { Authorization: `Bearer ${token}` }
            })
            setResidentes(res.data)
        } catch {
            toast.error("Erro ao buscar residentes")
        }
    }

    useEffect(() => {
        if (token) buscarResidentes()
    }, [token])

    const editarResidente = async (id: number) => {
        try {
            const res = await axios.get(`http://localhost:8000/residentes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })

            const formatarData = (data: string) => {
                const d = new Date(data)
                return d.toISOString().split("T")[0] // retorna "YYYY-MM-DD"
            }
            setResidente({
                nome: res.data.nome || "",
                data_nascimento: res.data.data_nascimento ? formatarData(res.data.data_nascimento) : "",
                sexo: res.data.sexo || "",
                observacoes: res.data.observacoes || ""
            })

            setModoEdicao(true)
            setIdEdicao(id)
        } catch {
            toast.error("Erro ao carregar residente para edição")
        }
    }

    const salvarOuEditar = async () => {
        const { nome, data_nascimento, sexo, observacoes } = residente
        if (!nome || !data_nascimento || (!sexo && !modoEdicao)) {
            toast("Nome, Data Nascimento e sexo são obrigatórios")
            return
        }

        try {
            if (modoEdicao && idEdicao !== null) {
                const payload = { nome, data_nascimento, sexo, observacoes }

                await axios.put(`http://localhost:8000/residentes/${idEdicao}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                toast.success("Residente atualizado")
            } else {
                await axios.post(`http://localhost:8000/residentes/register`, residente, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                toast.success("Residente cadastrado com sucesso")
            }

            setResidente({ nome: "", data_nascimento: "", sexo: "", observacoes: "" })
            setModoEdicao(false)
            setIdEdicao(null)
            buscarResidentes()

        } catch {
            toast.error("Erro ao salvar residente")
        }
    }

    const excluiResidente = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este residente?")) return
        try {
            await axios.delete(`http://localhost:8000/residentes/excluir/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Residente excluído com sucesso")
            buscarResidentes()
        } catch {
            toast.error("Erro ao excluir residente")
        }
    }


    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Card>
                    <PageTitle>MediCare - {modoEdicao ? "Editar Residente" : "Cadastrar Residente"}</PageTitle>
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
                    <Button onClick={salvarOuEditar}> {modoEdicao ? "Salvar Alterações" : "Cadastrar Residente"} </Button>
                </Card>
                <br></br>
                <Card className="mt-8">
                    <PageTitle>Residentes Cadastrados</PageTitle>
                    <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ backgroundColor: "#1f2937", color: "#fff" }}>
                                <th>Nome</th>
                                <th>Data Nascimento</th>
                                <th>Sexo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {residentes.map((c, i) => (
                                <tr key={c.id} style={{ backgroundColor: i % 2 === 0 ? "#374151" : "#4b5563", color: "#f1f5f9" }}>
                                    <td>{c.nome}</td>
                                    <td>{new Date(c.data_nascimento).toLocaleDateString()}</td>
                                    <td>{c.sexo}</td>
                                    <td>
                                        <Button onClick={() => editarResidente(c.id)}>Editar</Button>
                                        <Button onClick={() => excluiResidente(c.id)} >Excluir</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </DashboardLayout>
        </ProtectedRoute>
    )
}

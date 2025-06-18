'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import DashboardLayout from "@/components/layout/DashboardLayout"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import PageTitle from "@/components/ui/PageTitle"
import { Button } from "@/components/ui/Button"
import { toast } from "react-toastify"
import styled from "styled-components"

type Medicamento = {
    id: number
    nome: string
    descricao: string
    tipo: string
    observacao?: string
}

const TableRow = styled.tr<{ index: number }>`
  background-color: ${({ index }) => (index % 2 === 0 ? "#1e293b" : "#334155")};
  color: #f1f5f9;
`

export default function ListaMedicamentosPage() {
    const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const carregarMedicamentos = () => {
        axios.get("http://localhost:8000/medicamentos/listar", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setMedicamentos(res.data))
            .catch(() => toast.error("Erro ao carregar medicamentos"))
    }

    const excluirMedicamento = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este medicamento?")) return
        try {
            await axios.delete(`http://localhost:8000/residentes/excluir/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Medicamento excluído com sucesso")
            carregarMedicamentos()
        } catch {
            toast.error("Erro ao excluir medicamento")
        }
    }

    useEffect(() => {
        carregarMedicamentos()
    }, [])

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <PageTitle>Lista de Medicamentos</PageTitle>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Medicamento </th>
                                <th>Descrição de Uso</th>
                                <th>Tipo</th>
                                <th>Observação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicamentos.map((c,i) =>(
                                <TableRow key={c.id} index={i}>
                                    <td>{c.nome}</td>
                                    <td>{c.descricao}</td>
                                    <td>{c.tipo}</td>
                                    <td>{c.observacao}</td>
                                    <td>
                                        <Button onClick={() => alert("Abrir em modo de edição")}>Editar</Button>
                                        <Button onClick={() => excluirMedicamento(c.id)}>Excluir</Button>
                                    </td>
                                </TableRow>
                            ))}
                            {medicamentos.length === 0 && (
                                <tr>
                                    <td colSpan={5}>
                                        Nenhum remédio encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}
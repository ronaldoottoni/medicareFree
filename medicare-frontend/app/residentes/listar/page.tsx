'use client'

import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Title from "@/components/ui/Title"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import PageTitle from "@/components/ui/PageTitle"
import { Button } from "@/components/ui/Button"


type Residente = {
    id: number
    nome: string
    data_nascimento: string
    sexo: string
    observacoes?: string
}

const TableRow = styled.tr<{ index: number }> `
    background-color: ${({ index }) => (index % 2 === 0 ? "#1e293b" : "#334155")};
    color: #f1f5f9;
`

export default function ListaResidentes() {
    const [residentes, setResidentes] = useState<Residente[]>([])
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const carregarResidentes = () => {
        axios.get("http://localhost:8000/residentes/listar", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setResidentes(res.data))
            .catch(() => toast.error("Erro ao carregar Residentes"))
    }

    const excluirResidente = async (id: number) => {
        if (!confirm("Tem certeza que deseja excluir este residente?")) return
        try {
            await axios.delete(`http://localhost:8000/residentes/excluir/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Residente excluído com sucesso")
            carregarResidentes()
        } catch {
            toast.error("Erro ao excluir Residente")
        }
    }
    useEffect(() => {
        carregarResidentes()
    }, [])

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <PageTitle>Lista de Residentes</PageTitle>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Data Nascimento</th>
                                <th>Sexo</th>
                                <th>Observacoes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {residentes.map((c, i) => (
                                <TableRow key={c.id} index={i}>
                                    <td>{c.nome}</td>
                                    <td>{new Date(c.data_nascimento).toLocaleDateString()}</td>
                                    <td><center>{c.sexo}</center></td>
                                    <td>{c.observacoes}</td>
                                    <td>
                                        <Button onClick={() => alert("Abrir em modo de edição")}>Editar</Button>
                                        <Button onClick={() => excluirResidente(c.id)}>Excluir</Button>
                                    </td>
                                </TableRow>
                            ))}
                            {residentes.length === 0 && (
                                <tr>
                                    <td colSpan={5}>
                                        Nenhum residente encontrado.
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


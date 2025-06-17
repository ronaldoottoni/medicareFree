'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import DashboardLayout from "@/components/layout/Layout"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import PageTitle from "@/components/ui/PageTitle"
import { Button } from "@/components/ui/Button"
import { toast } from "react-toastify"
import styled from "styled-components"

type Cuidador = {
  id: number
  nome: string
  email: string
  telefone?: string
  data_cadastro: string
}

const TableRow = styled.tr<{ index: number }>`
  background-color: ${({ index }) => (index % 2 === 0 ? "#1e293b" : "#334155")};
  color: #f1f5f9;
`

export default function ListaCuidadoresPage() {
  const [cuidadores, setCuidadores] = useState<Cuidador[]>([])
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const carregarCuidadores = () => {
    axios.get("http://localhost:8000/cuidadores/listar", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setCuidadores(res.data))
      .catch(() => toast.error("Erro ao carregar cuidadores"))
  }

  const excluirCuidador = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este cuidador?")) return
    try {
      await axios.delete(`http://localhost:8000/cuidadores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success("Cuidador excluído com sucesso")
      carregarCuidadores()
    } catch {
      toast.error("Erro ao excluir cuidador")
    }
  }

  useEffect(() => {
    carregarCuidadores()
  }, [])

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PageTitle>Lista de Cuidadores</PageTitle>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="#1e293b text-white">
              <tr>
                <th className="text-left px-4 py-2">Nome</th>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Telefone</th>
                <th className="text-left px-4 py-2">Cadastro</th>
                <th className="text-left px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {cuidadores.map((c, i) => (
                <TableRow key={c.id} index={i}>
                  <td className="px-4 py-2">{c.nome}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.telefone}</td>
                  <td className="px-4 py-2">{new Date(c.data_cadastro).toLocaleDateString()}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button onClick={() => alert("Abrir modal de edição")} className="bg-blue-600">Editar</Button>
                    <Button onClick={() => excluirCuidador(c.id)} className="background-color:#f80303">Excluir</Button>
                  </td>
                </TableRow>
              ))}
              {cuidadores.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-4 text-center text-gray-500">
                    Nenhum cuidador encontrado.
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

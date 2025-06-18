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
      await axios.delete(`http://localhost:8000/cuidadores/excluir/${id}`, {
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
        <div >
          <table >
            <thead >
              <tr>
                <th >Nome</th>
                <th >Email</th>
                <th >Telefone</th>
                <th >Cadastro</th>
                <th >Ações</th>
              </tr>
            </thead>
            <tbody>
              {cuidadores.map((c, i) => (
                <TableRow key={c.id} index={i}>
                  <td >{c.nome}</td>
                  <td >{c.email}</td>
                  <td >{c.telefone}</td>
                  <td >{new Date(c.data_cadastro).toLocaleDateString()}</td>
                  <td >
                    <Button onClick={() => alert("Abrir em modo de edição")} >Editar</Button>
                    <Button onClick={() => excluirCuidador(c.id)} >Excluir</Button>
                  </td>
                </TableRow>
              ))}
              {cuidadores.length === 0 && (
                <tr>
                  <td colSpan={5} >
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

'use client'

import axios from "axios"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import DashboardLayout from "@/components/layout/DashboardLayout"
import PageTitle from "@/components/ui/PageTitle"
import { useEffect, useState, useRef } from "react"
import { useToken } from "@/app/hooks/useToken"
import { Button } from "@/components/ui/Button"
import { toast } from "sonner"

interface Agendamento {
  id: number
  residente: { nome: string }
  cuidador: { nome: string }
  medicamento: { nome: string }
  dose: string
  horario: string
  status: string
}

export default function AgendamentosDashboard() {
  const { token, carregando } = useToken()
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const alertadosRef = useRef<Set<number>>(new Set())

  const buscarAgendamentos = async () => {
    if (token) {
      try {
        const res = await axios.get("http://localhost:8000/agendamentos/alertas", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setAgendamentos(res.data)
      } catch {
        toast.error("Erro ao buscar agendamentos")
      }
    }
  }

  const atualizarStatus = async (id: number) => {
    try {
      await axios.patch(
        `http://localhost:8000/agendamentos/${id}/status`,
        { status: "realizado" },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success("Status atualizado com sucesso")
      buscarAgendamentos()
    } catch (error: any) {
      toast.error("Erro ao atualizar status")
      console.error(error)
    }
  }

  // ⏰ ALERTA DE HORÁRIO
  useEffect(() => {
    const verificarAlertas = () => {
      const agora = new Date()
      agendamentos.forEach((ag) => {
        const horario = new Date(ag.horario)
        const jaAlertado = alertadosRef.current.has(ag.id)

        console.log("⏰ Verificando agendamento:", ag)
        console.log("⏰ Horário agendamento:", horario.toISOString())
        console.log("🕒 Agora:", agora.toISOString())

        if (ag.status === "pendente" && horario <= agora && !jaAlertado) {
          toast(`⚠️ Hora de medicar ${ag.residente?.nome} com ${ag.medicamento?.nome}`, {
            autoClose: false,
          })
          alertadosRef.current.add(ag.id)
        }
      })
    }

    verificarAlertas()
    const intervalo = setInterval(verificarAlertas, 60000) // a cada 1 minuto
    return () => clearInterval(intervalo)
  }, [agendamentos])

  useEffect(() => {
    if (!carregando && token) {
      buscarAgendamentos()
    }
  }, [carregando, token])

  if (carregando) return null

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PageTitle>Agendamentos Atuais</PageTitle>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1f2937", color: "#fff" }}>
              <th>Residente</th>
              <th>Cuidador</th>
              <th>Medicamento</th>
              <th>Dosagem</th>
              <th>Horário</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((a, i) => (
              <tr key={a.id} style={{ backgroundColor: i % 2 === 0 ? "#374151" : "#4b5563", color: "#f1f5f9" }}>
                <td>{a.residente?.nome}</td>
                <td>{a.cuidador?.nome}</td>
                <td>{a.medicamento?.nome}</td>
                <td>{a.dose}</td>
                <td>{new Date(a.horario).toLocaleString("pt-BR")}</td>
                <td>{a.status}</td>
                <td><center>
                  <Button
                    onClick={() => atualizarStatus(a.id)}
                    disabled={a.status === 'realizado'}
                  >
                    {a.status === 'realizado' ? '✔️ Realizado' : 'Marcar como Realizado'}
                  </Button>
                </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DashboardLayout>
    </ProtectedRoute>
  )
}

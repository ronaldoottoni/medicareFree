'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import DashboardLayout from "@/components/layout/Layout"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

type Agendamento = {
    id: number
    horario: string
    status: string
    dose: string
    observacoes: string
    residente: {
        nome: string
    }
    medicamento: {
        nome: string
    }
}

export default function DashboardPage() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
    const router = useRouter()

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    useEffect(() => {
        if (!token) {
            router.push("/login")
            return
        }

        axios
            .get("http://localhost:8000/agendamentos/alertas", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setAgendamentos(res.data))
            .catch((err) => {
                toast.error("Erro ao carregar agendamentos")
                if (err.response?.status === 401) router.push("/login")
            })
    }, [])

    const atualizarStatus = async (id: number, novoStatus: string) => {
        try {
            await axios.patch(`http://localhost:8000/agendamentos/${id}/status`,
                { status: novoStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            toast.success("Status atualizado!")
            setAgendamentos(prev =>
                prev.map(ag => ag.id === id ? { ...ag, status: novoStatus } : ag)
            )
        } catch {
            toast.error("Erro ao atualizar status")
        }
    }

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4" style={{ color: "#ffffff" }}>Agendamentos próximos</h1>

                    {agendamentos.length === 0 && (
                        <p className="text-gray-500" style={{ color: "#dc2626" }}>Nenhum agendamento encontrado.</p>
                    )}

                    {agendamentos.map((ag) => (
                        <div key={ag.id} className="border p-4 mb-3 rounded-md shadow-sm bg-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{ag.residente.nome}</p>
                                    <p className="text-sm text-gray-700">Medicamento: {ag.medicamento.nome}</p>
                                    <p className="text-sm text-gray-600">Horário: {new Date(ag.horario).toLocaleString()}</p>
                                    <p className="text-sm text-gray-500">Dose: {ag.dose}</p>
                                    <p className="text-sm text-gray-500">Status: {ag.status}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button onClick={() => atualizarStatus(ag.id, "tomado")} className="bg-green-500 text-white px-2 py-1 rounded">
                                        Marcar como tomado
                                    </button>
                                    <button onClick={() => atualizarStatus(ag.id, "atrasado")} className="bg-yellow-500 text-white px-2 py-1 rounded">
                                        Atrasado
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}

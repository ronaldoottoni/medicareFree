'use client'

import ProtectedRoute from "@/components/auth/ProtectedRoute"
import Card from "@/components/ui/Card"
import Label from "@/components/ui/Label"
import PageTitle from "@/components/ui/PageTitle"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

import axios from "axios"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import DashboardLayout from "@/components/layout/DashboardLayout"

export default function CadastrarAgendamentoPage() {
    const [agendamento, setAgendamento] = useState({
        id_residente: "",
        id_cuidador: "",
        id_medicamento: "",
        dosagem: "",
        intervalo: "",
        dias: "",
        dataPriDose: "",
        horaPriDose: ""

    })

    const [residentes, setResidentes] = useState([])
    const [nomeResidente, setNomeResidente] = useState("")

    useEffect(() => {
        const buscarNomeResidente = async () => {
            if (!agendamento.id_residente) {
                setNomeResidente("")
                return
            }

            try {
                const res = await axios.get(`http://localhost:8000/residentes/${agendamento.id_residente}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setNomeResidente(res.data.nome)
            } catch {
                setNomeResidente("Residente não encontrado")
            }
        }

        buscarNomeResidente()
    }, [agendamento.id_residente])

    const [cuidadores, setCuidadores] = useState([])
    const [nomeCuidador, setNomeCuidador] = useState("")

    useEffect(() => {
        const buscarNomeCuidador = async () => {
            if (!agendamento.id_cuidador) {
                setNomeCuidador("")
                return
            }
            try {
                const res = await axios.get(`http://localhost:8000/cuidadores/${agendamento.id_cuidador}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setNomeCuidador(res.data.nome)
            } catch {
                setNomeCuidador("Cuidador não encontrado")
            }
        }
    })

    const [medicamentos, setMedicamentos] = useState([])
    const [nomeMedicamento, setNomeMedicamento] = useState("")
    useEffect(() => {
        const buscarNomeMedicamento = async () => {
            if (!agendamento.id_medicamento) {
                setNomeMedicamento("")
                return
            }
            try {
                const res = await axios.get(`http://localhost:8000/medicamentos/${agendamento.id_medicamento}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setNomeMedicamento(res.data.nome)
            } catch {
                setNomeMedicamento("Medicamento não encontrado")
            }
        }
    })

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    const hojeFormatado = new Date().toISOString().split("T")[0]

    const cadastrar = async () => {
        const { id_residente, id_cuidador, id_medicamento, dosagem, intervalo, dias, dataPriDose, horaPriDose } = agendamento
        if (!id_residente || !id_cuidador || !id_medicamento || !dosagem || !intervalo || !dias || !dataPriDose || !horaPriDose) {
            toast.error("TODOS os campos são obrigatórios")
            return
        }

        const intervaloInt = parseInt(intervalo)
        if (isNaN(intervaloInt) || intervaloInt <= 0) {
            toast.warn("Informe um intervalo em horas maior que zero")
            return
        }

        const diasInt = parseInt(dias)
        if (isNaN(diasInt) || diasInt <= 0) {
            toast.warn("Informe a quantidade de dias em número maior que zero")
            return
        }

        const hoje = new Date()
        hoje.setHours(0, 0, 0, 0)
        const dataSelecionada = new Date(agendamento.dataPriDose)
        if (!agendamento.dataPriDose || dataSelecionada < hoje) {
            toast.warn("A data da primeira dose deve ser hoje ou uma data futura")
            return
        }

        try {
            await axios.post("http://localhost:8000/agendamentos/register", agendamento, {
                headers: { Authorization: `Bearar ${token}` },
            })
            toast.success("Agendamentos geraddos com sucesso")
            setAgendamento({ id_residente: "", id_cuidador: "", id_medicamento: "", dosagem: "", intervalo: "", dias: "", dataPriDose: "", horaPriDose: "" })
        } catch {
            toast.error("Erro ao gerar agendamentos")
        }
    }

    return (
        <ProtectedRoute>
            <DashboardLayout>
                <Card>
                    <PageTitle>MediCare - Gerar Agendamentos</PageTitle>
                    <div >
                        <Label>Residente</Label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <Input
                                placeholder="Cód Residente"
                                value={agendamento.id_residente}
                                onChange={(e) => setAgendamento({ ...agendamento, id_residente: e.target.value })}
                                style={{ width: "130px" }}
                            />
                            <Input
                                placeholder="Nome do Residente"
                                value={nomeResidente}
                                style={{ color: "#38bdf8", fontSize: "0.9rem", width: "200%" }}
                            />
                        </div>
                        <Label>Cuidador</Label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <Input
                                placeholder="Cód Cuidador"
                                value={agendamento.id_cuidador}
                                onChange={(e) => setAgendamento({ ...agendamento, id_cuidador: e.target.value })}
                                style={{ width: "130px" }}
                            />
                            <Input
                                placeholder="Nome do Cuidador"
                                value={nomeCuidador}
                                style={{ color: "#38bdf8", fontSize: "0.9rem", width: "200%" }}
                            />
                        </div>
                        <Label>Medicamento</Label>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <Input
                                placeholder="Cód Medicamento"
                                value={agendamento.id_medicamento}
                                onChange={(e) => setAgendamento({ ...agendamento, id_medicamento: e.target.value })}
                                style={{ width: "130px" }}
                            />
                            <Input
                                placeholder="Nome do Medicamento"
                                value={nomeMedicamento}
                                style={{ color: "#38bdf8", fontSize: "0.9rem", width: "200%" }}
                            />
                        </div>
                        <Label>Dosagem</Label>
                        <Input
                            placeholder="Informe a dosagem receitada"
                            value={agendamento.dosagem}
                            onChange={(e) => setAgendamento({ ...agendamento, dosagem: e.target.value })}
                        />
                        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                            <div style={{ flex: "1" }}>
                                <Label>Intervalo</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    step="1"
                                    placeholder="Intervalo das doses em Horas"
                                    value={agendamento.intervalo}
                                    onChange={(e) => setAgendamento({ ...agendamento, intervalo: e.target.value })}
                                    inputMode="numeric"
                                    style={{ width: "90%" }}
                                />
                            </div>
                            <div style={{ flex: "1" }}>

                                <Label>Qtos Dias?</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    step="1"
                                    placeholder="Informe quantos dias"
                                    value={agendamento.dias}
                                    onChange={(e) => setAgendamento({ ...agendamento, dias: e.target.value })}
                                    inputMode="numeric"
                                    style={{ width: "90%" }}
                                />
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
                            <div style={{ flex: "1" }}>

                                <Label>Data Primeira Dose</Label>
                                <Input
                                    type="date"
                                    min={hojeFormatado}
                                    value={agendamento.dataPriDose}
                                    onChange={(e) => setAgendamento({ ...agendamento, dataPriDose: e.target.value })}
                                    style={{ width: "90%" }}
                                />
                            </div>
                            <div style={{ flex: "1" }}>

                                <Label>Hora Primeira Dose</Label>
                                <Input
                                    type="time"
                                    value={agendamento.horaPriDose}
                                    onChange={(e) => setAgendamento({ ...agendamento, horaPriDose: e.target.value })}
                                />
                            </div>
                        </div>
                        <Button onClick={cadastrar}>Gerar Agendamentos</Button>
                    </div>
                </Card>
            </DashboardLayout>
        </ProtectedRoute >
    )
}
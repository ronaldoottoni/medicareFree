'use client'

import ProtectedRoute from "@/components/auth/ProtectedRoute"
import Layout from "@/components/layout/Layout"
import Card from "@/components/ui/Card"
import Label from "@/components/ui/Label"
import PageTitle from "@/components/ui/PageTitle"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"

export default function CadastrarAgendamentoPage() {
    const [residentes, setResidentes] = useState([])
    const [cuidadores, setCuidadores] = useState([])
    const [ medicamentos, setMedicamentos] = useState([])
    const [agendamento, setAgendamento] = useState({
        id_residente: "",
        id_cuidador: "",
        id_medicamento: "",
        horario:"",
        dose:"",
        
    })
}
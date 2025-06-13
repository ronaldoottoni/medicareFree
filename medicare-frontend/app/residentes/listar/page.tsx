'use client'

import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

import Container from "@/components/ui/Container"
import Card from "@/components/ui/Card"
import Title from "@/components/ui/Title"

type Residente = {
    id: number
    nome: string
    data_nascimento: string
    sexo: string
    observacoes?: string
}

const ResidenteItem = styled.div`
  border-bottom: 1px solid #e5e7eb;
  padding: 0.75rem 0;

  &:last-child {
    border-bottom: none;
  }
`

export default function ListaResidentes() {
    const [residentes, setResidentes] = useState<Residente[]>([])
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    useEffect(() => {
        axios
            .get("http://localhost:8000/residentes", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setResidentes(res.data))
            .catch(() => toast.error("Erro ao carregar residentes"))
    }, [])

    return (
        <Container>
            <Card>
                <Title>Lista de Residentes</Title>

                {residentes.length === 0 ? (
                    <p>Nenhum residente encontrado.</p>
                ) : (
                    residentes.map((res) => (
                        <ResidenteItem key={res.id}>
                            <p><strong>{res.nome}</strong></p>
                            <p className="text-sm text-gray-600">Nascimento: {res.data_nascimento}</p>
                            <p className="text-sm text-gray-600">Sexo: {res.sexo}</p>
                            {res.observacoes && (
                                <p className="text-sm text-gray-500">Obs: {res.observacoes}</p>
                            )}
                        </ResidenteItem>
                    ))
                )}
            </Card>
        </Container>
    )
}


'use client'

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useCallback } from "react"


type Residente = {
    id: number
    nome: string
    data_nascimento: string
    sexo: string
    observacoes?: string
    data_cadastro: string
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem;
`

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
`

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`

const Section = styled.div`
  margin-bottom: 2rem;
`

const Label = styled.label`
  display: block;
  margin-top: 1rem;
  font-size: 0.9rem;
  font-weight: 500;
`

export default function ResidentesPage() {
    const [residentes, setResidentes] = useState<Residente[]>([])
    const [novo, setNovo] = useState({ nome: "", data_nascimento: "", sexo: "", observacoes: "" })
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const carregarResidentes = useCallback(() => {
        axios
            .get("http://localhost:8000/residentes", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setResidentes(res.data))
            .catch(() => toast.error("Erro ao carregar residentes"))
    }, [token])

    useEffect(() => {
        carregarResidentes()
    }, [carregarResidentes])

    const cadastrarResidente = async () => {
        if (!novo.nome || !novo.data_nascimento || !novo.sexo) {
            toast.warn("Preencha todos os campos obrigatórios")
            return
        }

        try {
            await axios.post("http://localhost:8000/residentes", novo, {
                headers: { Authorization: `Bearer ${token}` },
            })
            toast.success("Residente cadastrado com sucesso")
            setNovo({ nome: "", data_nascimento: "", sexo: "", observacoes: "" })
            carregarResidentes()
        } catch {
            toast.error("Erro ao cadastrar residente")
        }
    }

    return (
        <Container>
            <Card>
                <Title>Cadastrar Residente</Title>

                <Section>
                    <Label>Nome</Label>
                    <Input
                        placeholder="Nome completo"
                        value={novo.nome}
                        onChange={(e) => setNovo({ ...novo, nome: e.target.value })}
                    />

                    <Label>Data de nascimento</Label>
                    <Input
                        type="date"
                        value={novo.data_nascimento}
                        onChange={(e) => setNovo({ ...novo, data_nascimento: e.target.value })}
                    />

                    <Label>Sexo</Label>
                    <select
                        value={novo.sexo}
                        onChange={(e) => setNovo({ ...novo, sexo: e.target.value })}
                        className="mt-1 w-full border rounded px-3 py-2"
                    >
                        <option value="">Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>

                    <Label>Observações</Label>
                    <Input
                        placeholder="Observações (opcional)"
                        value={novo.observacoes}
                        onChange={(e) => setNovo({ ...novo, observacoes: e.target.value })}
                    />

                    <Button onClick={cadastrarResidente} className="mt-6 w-full">
                        Cadastrar Residente
                    </Button>
                </Section>

                <Section>
                    <h2 className="text-lg font-semibold mb-2">Residentes cadastrados</h2>
                    {residentes.length === 0 && <p>Nenhum residente encontrado.</p>}

                    {residentes.map((res) => (
                        <div key={res.id} className="border p-3 mb-3 rounded">
                            <p><strong>{res.nome}</strong></p>
                            <p className="text-sm text-gray-600">Nascimento: {res.data_nascimento}</p>
                            <p className="text-sm text-gray-600">Sexo: {res.sexo}</p>
                            {res.observacoes && (
                                <p className="text-sm text-gray-500">Obs: {res.observacoes}</p>
                            )}
                        </div>
                    ))}
                </Section>
            </Card>
        </Container>
    )
}

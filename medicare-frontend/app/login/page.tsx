'use client'

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Title from "@/components/ui/Title"
import PageTitle from "@/components/ui/PageTitle"
import styled from 'styled-components'
import Container from "@/components/ui/Container"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import { toast } from "react-toastify"


export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setErro('')

        if (!email || !senha) {
            setErro('Preencha todos os campos')
            return
        }

        setLoading(true)

        try {
            const response = await axios.post("http://localhost:8000/cuidadores/login", {
                email,
                senha
            })

            const { access_token } = response.data
            localStorage.setItem("token", access_token)

            toast.success("Login realizado com sucesso!")
            router.push("/dashboard")

        } catch (erro) {
            setErro("Email ou senha inválidos")
            toast.error("Erro ao fazer login")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <Card>
                <PageTitle className="grid gap-4 w-full max-w-md mx-auto">MediCare - Login </PageTitle>
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="mt-4"
                />

                {erro && <p style={{ color: 'red', marginTop: 10 }}>{erro}</p>}

                <Button onClick={handleLogin} className="mt-6 w-full" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </Button>
            </Card>
        </Container>
    )
}

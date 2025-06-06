'use client'

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import styled from 'styled-components'
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios";
import { toast } from "react-toastify"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9fafb;
`

const Card = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
`

const Title = styled.div`
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
`

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
                <Title>Login no MediCare</Title>
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

'use client'

import axios from "axios"
import Layout from "@/components/layout/Layout"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import Card from "@/components/ui/Card"
import Label from "@/components/ui/Label"
import PageTitle from "@/components/ui/PageTitle"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function CadastroCuidadoresPage() {
  const [cuidador, setCuidador] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: ""
  })

  const [cuidadores, setCuidadores] = useState<any[]>([])
  const [modoEdicao, setModoEdicao] = useState(false)
  const [idEdicao, setIdEdicao] = useState<number | null>(null)

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const buscarCuidadores = async () => {
    try {
      const res = await axios.get("http://localhost:8000/cuidadores/listar", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCuidadores(res.data)
    } catch {
      toast.error("❌ Erro ao buscar cuidadores")
    }
  }

  useEffect(() => {
    if (token) buscarCuidadores()
  }, [token])

  const editarCuidador = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:8000/cuidadores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setCuidador({
        nome: res.data.nome || "",
        email: res.data.email || "",
        telefone: res.data.telefone || "",
        senha: ""
      })

      setModoEdicao(true)
      setIdEdicao(id)
    } catch {
      toast.error("⚠️ Erro ao carregar cuidador para edição")
    }
  }

  const salvarOuEditar = async () => {
    const { nome, email, telefone, senha } = cuidador
    if (!nome || !email || (!modoEdicao && !senha)) {
      toast.warning("⚠️ Nome, e-mail e senha são obrigatórios")
      return
    }

    try {
      if (modoEdicao && idEdicao !== null) {
        const payload = { nome, email, telefone }
        if (senha) payload["senha"] = senha

        await axios.put(`http://localhost:8000/cuidadores/${idEdicao}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        toast.success("✅ Cuidador atualizado com sucesso")
      } else {
        await axios.post("http://localhost:8000/cuidadores/register", cuidador, {
          headers: { Authorization: `Bearer ${token}` },
        })
        toast.success("✅ Cuidador cadastrado com sucesso")
      }

      setCuidador({ nome: "", email: "", telefone: "", senha: "" })
      setModoEdicao(false)
      setIdEdicao(null)
      buscarCuidadores()
    } catch {
      toast.error("❌ Erro ao salvar cuidador")
    }
  }

  const excluirCuidador = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este cuidador?")) return
    try {
      await axios.delete(`http://localhost:8000/cuidadores/excluir/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success("🗑️ Cuidador excluído com sucesso")
      buscarCuidadores()
    } catch {
      toast.error("❌ Erro ao excluir cuidador")
    }
  }

  return (
    <ProtectedRoute>
      <Layout>
        <Card>
          <PageTitle className="grid gap-4 w-full max-w-md mx-auto">
            MediCare - {modoEdicao ? "Editar Cuidador" : "Cadastrar Cuidador"}
          </PageTitle>
          <div className="grid gap-4 max-w-md">
            <Label>Nome Completo</Label>
            <Input
              placeholder="Nome Completo"
              value={cuidador.nome}
              onChange={(e) => setCuidador({ ...cuidador, nome: e.target.value })}
            />
            <Label>E-mail</Label>
            <Input
              type="email"
              placeholder="E-mail"
              value={cuidador.email}
              onChange={(e) => setCuidador({ ...cuidador, email: e.target.value })}
            />
            <Label>Telefone Celular</Label>
            <Input
              placeholder="Telefone"
              value={cuidador.telefone}
              onChange={(e) => setCuidador({ ...cuidador, telefone: e.target.value })}
            />
            <Label>Senha {modoEdicao ? "(deixe em branco para não alterar)" : ""}</Label>
            <Input
              type="password"
              placeholder="Senha"
              value={cuidador.senha}
              onChange={(e) => setCuidador({ ...cuidador, senha: e.target.value })}
            />
            <Button onClick={salvarOuEditar}>
              {modoEdicao ? "Salvar Alterações" : "Cadastrar Cuidador"}
            </Button>
          </div>
        </Card>

        <br />

        <Card className="mt-8">
          <PageTitle>Cuidadores Cadastrados</PageTitle>
          <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#1f2937", color: "#fff" }}>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cuidadores.map((c, i) => (
                <tr key={c.id} style={{ backgroundColor: i % 2 === 0 ? "#374151" : "#4b5563", color: "#f1f5f9" }}>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                  <td>
                    <Button onClick={() => editarCuidador(c.id)}>Editar</Button>
                    <Button onClick={() => excluirCuidador(c.id)}>Excluir</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Layout>
    </ProtectedRoute>
  )
}

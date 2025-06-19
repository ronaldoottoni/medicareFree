'use client'

import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa"
import styled from "styled-components"
import { Input } from "./Input"
import Label from "./Label"

type LookupFieldProps = {
    label: string
    value: string
    onChange: (value: string) => void
    fetchUrl: string
    listUrl: string
    modalTitle: string
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const ModalContent = styled.div`
  background: #1e293b;
  color: #f1f5f9;
  padding: 2rem;
  border-radius: 10px;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`



export default function LookupField({ label, value, onChange, fetchUrl, listUrl, modalTitle }: LookupFieldProps) {
    const [showModal, setShowModal] = useState(false)
    const [labelValue, setLabelValue] = useState("")
    const [list, setList] = useState<any[]>([])

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    useEffect(() => {
        if (!value) {
            setLabelValue("")
            return
        }

        fetch(`${fetchUrl}/${value}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.ok ? res.json() : Promise.reject())
            .then((data) => setLabelValue(data.nome || ""))
            .catch(() => setLabelValue("Não encontrado"))
    }, [value])

    const handleOpen = async () => {
        try {
            const res = await fetch(listUrl, {
                headers: { Authorization: `Bearer ${token}` }
            })
            const data = await res.json()
            setList(data)
            setShowModal(true)
        } catch {
            setList([])
        }
    }

    return (
        <>
            <Label>{label}</Label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Input
                    placeholder="Código"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    style={{ width: "100px" }}
                />
                <button
                    type="button"
                    onClick={handleOpen}
                    style={{
                        height: "42px",
                        width: "42px",
                        background: "#334155",
                        border: "1px solid #475569",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        cursor: "pointer"
                    }}
                >
                    <FaSearch color="#f1f5f9" size={16} />
                </button>
                <Input
                    placeholder="Nome"
                    value={labelValue}
                    readOnly
                    style={{ width: "195%", color: "#38bdf8", fontSize: "0.9rem" }}
                />
            </div>

            {showModal && (
                <ModalOverlay onClick={() => setShowModal(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <h2>{modalTitle}</h2>
                        <table style={{ width: "100%", marginTop: "1rem" }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Código</th>
                                    <th style={{ textAlign: "left", padding: "8px" }}>Nome</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item) => (
                                    <tr
                                        key={item.id}
                                        onDoubleClick={() => {
                                            onChange(item.id.toString())
                                            setShowModal(false)
                                        }}
                                        style={{ cursor: "pointer", background: "#334155" }}
                                    >
                                        <td style={{ padding: "8px" }}>{item.id}</td>
                                        <td style={{ padding: "8px" }}>{item.nome}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    )
}

'use client'

import styled from 'styled-components'
import Link from 'next/link'
import { useState } from 'react'

const SidebarWrapper = styled.aside`
  width: 220px;
  background: #1e293b;
  color: white;
  height: 100vh;
  padding: 2rem 1rem;
`

const NavItem = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SubmenuWrapper = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? "block" : "none")};
  margin-left: 1rem;
  margin-bottom: 1rem;
`

const SubItem = styled(Link)`
  display: block;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  &:hover {
    color: #38bdf8;
  }
`

export default function Sidebar() {
  const [openCuidadores, setOpenCuidadores] = useState(false)
  const [openResidentes, setOpenResidentes] = useState(false)
  const [openMedicamentos, setOpenMedicamentos] = useState(false)
  const [openAgendamentos, setOpenAgendamentos] = useState(false)

  return (
    <SidebarWrapper>
      <h2 className="text-xl font-bold mb-6">MediCare</h2>
      <Link href="/dashboard" className="block mb-4 font-semibold text-white hover:text-sky-400">
        Dashboard
      </Link>

      {/* Cuidadores com submenu */}
      <NavItem onClick={() => setOpenCuidadores(!openCuidadores)}>
        <span>Cuidadores</span>
        <span>{openCuidadores ? "▼" : "▶︎"}</span>
      </NavItem>
      <SubmenuWrapper open={openCuidadores}>
        <SubItem href="/cuidadores">Cadastrar</SubItem>
        <SubItem href="/cuidadores/listar">Listar</SubItem>
      </SubmenuWrapper>

      {/* Residentes com submenu */}
      <NavItem onClick={() => setOpenResidentes(!openResidentes)}>
        <span>Residentes</span>
        <span>{openResidentes ? "▼" : "▶︎"}</span>
      </NavItem>
      <SubmenuWrapper open={openResidentes}>
        <SubItem href="/residentes">Cadastrar</SubItem>
        <SubItem href="/residentes/listar">Listar</SubItem>
      </SubmenuWrapper>

      {/* Medicamentos com submenu */}
      <NavItem onClick={() => setOpenMedicamentos(!openMedicamentos)}>
        <span>Medicamentos</span>
        <span>{openMedicamentos ? "▼" : "▶︎"}</span>
      </NavItem>
      <SubmenuWrapper open={openMedicamentos}>
        <SubItem href="/medicamentos">Cadastrar</SubItem>
        <SubItem href="/medicamentos/listar">Listar</SubItem>
      </SubmenuWrapper>

      {/* Agendamentos com submenu */}
      <NavItem onClick={() => setOpenAgendamentos(!openAgendamentos)}>
        <span>Agendamentos</span>
        <span>{openAgendamentos ? "▼" : "▶︎"}</span>
      </NavItem>
      <SubmenuWrapper open={openAgendamentos}>
        <SubItem href="/agendamentos">Cadastrar</SubItem>
        <SubItem href="/agendamentos/listar">Listar</SubItem>
      </SubmenuWrapper>

    </SidebarWrapper>
  )
}
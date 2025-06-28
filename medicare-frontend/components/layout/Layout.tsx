'use client'

import Sidebar from "./Sidebar"
import Header from "./Header"
import styled from "styled-components"
import { ReactNode } from "react"
import { Toaster } from "sonner"

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #1e293b;
  overflow-y: auto;
`

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutWrapper>
      <Sidebar />
      <Main>
        <Header />
        <Content>{children}</Content>
        <Toaster position="top-right" richColors />
      </Main>
    </LayoutWrapper>
  )
}

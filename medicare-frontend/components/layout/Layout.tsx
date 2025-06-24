'use client'

import Sidebar from "./Sidebar"
import Header from "./Header"
import styled from "styled-components"
import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

// Dentro do seu componente de layout:

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
                <ToastContainer position="top-right" autoClose={5000} />
            </Main>
        </LayoutWrapper>
    )
}

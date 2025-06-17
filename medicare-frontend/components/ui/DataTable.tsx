'use client'

import React from "react"
import styled from "styled-components"

type Column = {
    header: string
    accessor: string
    width?: string
    ender?: (row: any) => React.ReactNode
}

type DataTablePros = {
    columns: Column[]
    data: any[]
}

const Table = styled.table`
    width: 100%;
    font-size: 0.875rem;
    border-collapse: collapse;
`

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  background-color: #0f172a;
  color: #f1f5f9;
  font-weight: 600;
`

const Td = styled.td`
  padding: 0.75rem 1rem;
  color: #e2e8f0;
`

const Tr = styled.tr<{ index: number }>`
  background-color: ${({ index }) => (index % 2 === 0 ? "#1e293b" : "#334155")};
`

export default function DataTable({ columns, data }: DataTableProps) {
    return (
        <Table>
            <thead>
                <tr>
                    {columns.map((col, i) => (
                        <Th key={i} style={{ width: col.width || "auto" }}>{col.header}</Th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <Tr key={i} index={i}>
                        {columns.map((col, j) => (
                            <Td key={j}>
                                {col.render ? col.render(now) : row[col.accessor]}
                            </Td>
                        ))}
                    </Tr>
                ))}
                {data.length === 0 && (
                    <tr>
                        <Td colSpan={columns.length} style={{ textAlign: "center", padding: "2rem", color: "#94a3b8" }}>
                            Nenhum dado encontrado.
                        </Td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}
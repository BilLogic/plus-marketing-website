import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/** A data table with sorting, filtering, and pagination composed from Table + custom logic. */
const meta = {
  title: "Components/DataTable",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

const data: Payment[] = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@yahoo.com" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "abe45@gmail.com" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "monserrat44@gmail.com" },
  { id: "5kma53ae", amount: 874, status: "success", email: "silas22@gmail.com" },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@hotmail.com" },
  { id: "p0r3e9ka", amount: 129, status: "pending", email: "derek91@yahoo.com" },
  { id: "q7w8f2lx", amount: 450, status: "success", email: "maria.j@gmail.com" },
  { id: "t4k6n1vz", amount: 562, status: "processing", email: "alex.w@outlook.com" },
]

type SortDir = "asc" | "desc" | null
type SortKey = keyof Payment | null

const statusColor: Record<Payment["status"], string> = {
  success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  processing: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  failed: "bg-red-500/10 text-red-600 border-red-500/20",
  pending: "bg-muted text-muted-foreground",
}

const DataTableDemo = () => {
  const [filter, setFilter] = React.useState("")
  const [sortKey, setSortKey] = React.useState<SortKey>(null)
  const [sortDir, setSortDir] = React.useState<SortDir>(null)
  const [page, setPage] = React.useState(0)
  const perPage = 5

  const toggleSort = (key: keyof Payment) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"))
      if (sortDir === "desc") setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const filtered = data.filter(
    (row) =>
      row.email.toLowerCase().includes(filter.toLowerCase()) ||
      row.status.includes(filter.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = a[sortKey]
    const bv = b[sortKey]
    if (typeof av === "number" && typeof bv === "number")
      return sortDir === "asc" ? av - bv : bv - av
    return sortDir === "asc"
      ? String(av).localeCompare(String(bv))
      : String(bv).localeCompare(String(av))
  })

  const totalPages = Math.ceil(sorted.length / perPage)
  const pageData = sorted.slice(page * perPage, (page + 1) * perPage)

  return (
    <div className="w-[640px] space-y-4">
      <Input
        placeholder="Filter emails or status…"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value)
          setPage(0)
        }}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button variant="ghost" size="sm" onClick={() => toggleSort("status")}>
                  Status <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => toggleSort("email")}>
                  Email <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button variant="ghost" size="sm" onClick={() => toggleSort("amount")}>
                  Amount <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length ? (
              pageData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Badge variant="outline" className={statusColor[row.status]}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${row.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {sorted.length} row{sorted.length !== 1 && "s"} total
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span>
            Page {page + 1} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

/** A payments table with sorting, filtering, and pagination. */
export const Default: Story = {
  render: () => <DataTableDemo />,
}

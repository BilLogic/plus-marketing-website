import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

/** Data table built from composable row, header, and cell primitives. */
const meta = {
  title: "components-misc/Table",
  component: Table,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const invoices = [
  { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
]

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.id}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

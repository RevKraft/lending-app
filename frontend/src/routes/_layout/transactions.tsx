import {
    Container,
    Flex,
    Heading,
    Skeleton,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react"
  import { useSuspenseQuery } from "@tanstack/react-query"
  import { createFileRoute } from "@tanstack/react-router"
  
  import { Suspense } from "react"
  import { ErrorBoundary } from "react-error-boundary"
  import { TransactionsService } from "../../client"
  import Navbar from "../../components/Common/Navbar"
  
  export const Route = createFileRoute("/_layout/transactions")({
    component: Transactions,
  })
  
  function TransactionsTableBody() {
    const { data: transactions } = useSuspenseQuery({
      queryKey: ["transactions"],
      queryFn: () => TransactionsService.readTransactions({}),
    })
  
    return (
      <Tbody>
        {transactions.data.map((transaction) => (
          <Tr key={transaction.id}>
            <Td>{transaction.id}</Td>
            <Td>{transaction.title}</Td>
            <Td color={!transaction.description ? "ui.dim" : "inherit"}>
              {transaction.description || "N/A"}
            </Td>
          </Tr>
        ))}
      </Tbody>
    )
  }
  function TransactionsTable() {
    return (
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <ErrorBoundary
            fallbackRender={({ error }) => (
              <Tbody>
                <Tr>
                  <Td colSpan={4}>Something went wrong: {error.message}</Td>
                </Tr>
              </Tbody>
            )}
          >
            <Suspense
              fallback={
                <Tbody>
                  {new Array(5).fill(null).map((_, index) => (
                    <Tr key={index}>
                      {new Array(4).fill(null).map((_, index) => (
                        <Td key={index}>
                          <Flex>
                            <Skeleton height="20px" width="20px" />
                          </Flex>
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              }
            >
              <TransactionsTableBody />
            </Suspense>
          </ErrorBoundary>
        </Table>
      </TableContainer>
    )
  }
  
  function Transactions() {
    return (
      <Container maxW="full">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
          Transactions Management
        </Heading>
        <Navbar type={"Transaction"} />
        <TransactionsTable />
      </Container>
    )
  }
  
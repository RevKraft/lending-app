import { z } from "zod"
import {
  Button,
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
  Tooltip,
} from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useTranslation } from 'react-i18next'
import { useEffect } from "react"
import { TransactionsService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"

const transactionsSearchSchema = z.object({
  page: z.number().catch(1),
})

interface TransactionsSearchParams {
  page?: number
}
  
export const Route = createFileRoute("/_layout/transactions")({
  component: Transactions,
  validateSearch: (search) => transactionsSearchSchema.parse(search),
})

const PER_PAGE = 5

function getTransactionsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      TransactionsService.readTransactions({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["transactions", { page }],
  }
}

function TransactionsTable() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev: TransactionsSearchParams) => ({ ...prev, page }) })

  const {
    data: transactions,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getTransactionsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && transactions?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getTransactionsQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient])

  return (
    <>
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>
                <Tooltip label={t('transactions.tooltips.id')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.id')}</div>
                </Tooltip>
                </Th>
              <Th>
                <Tooltip label={t('transactions.tooltips.title')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.title')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('transactions.tooltips.beneficiaryId')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.beneficiaryId')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('transactions.tooltips.payoutSourceAmount')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.payoutSourceAmount')}</div>
                </Tooltip>    
              </Th>
              <Th>
                <Tooltip label={t('transactions.tooltips.payoutSourceCurrency')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.payoutSourceCurrency')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('transactions.tooltips.message')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.message')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('transactions.tooltips.paymentId')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.paymentId')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('transactions.tooltips.systemReferenceNumber')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.systemReferenceNumber')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('transactions.tooltips.description')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.description')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('transactions.tooltips.actions')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('transactions.table.actions')}</div>
                </Tooltip>
              </Th>
            </Tr>
          </Thead>
          {isPending ? (
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
          ) : (
            <Tbody>
              {transactions?.data.map((transaction) => (
                <Tr key={transaction.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td>{transaction.id}</Td>
                  <Td>{transaction.title}</Td>
                  <Td>{transaction.beneficiaryId}</Td>
                  <Td>{transaction.payout_source_amount}</Td>
                  <Td>{transaction.payout_source_currency}</Td>
                  <Td color={!transaction.message ? "ui.dim" : "inherit"}>
                    {transaction.message || "N/A"}
                  </Td>
                  <Td color={!transaction.payment_id ? "ui.dim" : "inherit"}>
                    {transaction.payment_id || "N/A"}
                  </Td>
                  <Td color={!transaction.system_reference_number ? "ui.dim" : "inherit"}>
                    {transaction.system_reference_number || "N/A"}
                  </Td>
                  <Td color={!transaction.description ? "ui.dim" : "inherit"}>
                    {transaction.description || "N/A"}
                  </Td>
                  <Td>
                    <ActionsMenu type={"Transaction"} value={transaction} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
      <Flex
        gap={4}
        alignItems="center"
        mt={4}
        direction="row"
        justifyContent="flex-end"
        position="fixed"
        bottom={4}
        right={4}
        p={4}
        backgroundColor="white"
        boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)"
      >
        <Button onClick={() => setPage(page - 1)} isDisabled={!hasPreviousPage}>
          {t('common.previous')}
        </Button>
        <span>{t('common.page')} {page}</span>
        <Button isDisabled={!hasNextPage} onClick={() => setPage(page + 1)}>
          {t('common.next')}
        </Button>
      </Flex>
    </>
  )
}

function Transactions() {
  const { t } = useTranslation()
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        {t('transactions.title')}
      </Heading>
      <Navbar type={"Transaction"} />
      <TransactionsTable />
    </Container>
  )
}

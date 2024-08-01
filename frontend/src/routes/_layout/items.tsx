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
import { ItemsService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"

const itemsSearchSchema = z.object({
  page: z.number().catch(1),
})

interface ItemsSearchParams {
  page?: number
}

export const Route = createFileRoute("/_layout/items")({
  component: Items,
  validateSearch: (search) => itemsSearchSchema.parse(search),
})

const PER_PAGE = 5

function getItemsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ItemsService.readItems({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["items", { page }],
  }
}

function ItemsTable() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev: ItemsSearchParams) => ({ ...prev, page }) })

  const {
    data: items,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getItemsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && items?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getItemsQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient])

  return (
    <>
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>
                <Tooltip label={t('items.tooltips.id')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('items.table.id')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('items.tooltips.title')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('items.table.title')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('items.tooltips.walletHashId')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('items.table.walletHashId')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('items.tooltips.status')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('items.table.status')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('items.tooltips.regulatoryRegion')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('items.table.regulatoryRegion')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('items.tooltips.description')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('items.table.description')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('items.tooltips.actions')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('items.table.actions')}</div>
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
              {items?.data.map((item) => (
                <Tr key={item.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td>{item.id}</Td>
                  <Td>{item.title}</Td>
                  <Td>{item.walletHashId}</Td>
                  <Td>{item.status}</Td>
                  <Td>{item.regulatoryRegion}</Td>
                  <Td color={!item.description ? "ui.dim" : "inherit"}>
                    {item.description || "N/A"}
                  </Td>
                  <Td>
                    <ActionsMenu type={"Item"} value={item} />
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

function Items() {
  const { t } = useTranslation()
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
      {t('items.title')}
      </Heading>
      <Navbar type={"Item"} />
      <ItemsTable />
    </Container>
  )
}

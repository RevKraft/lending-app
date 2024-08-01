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
import { BeneficiariesService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"

const beneficiariesSearchSchema = z.object({
  page: z.number().catch(1),
})

interface BeneficieriesSearchParams {
  page?: number
}

export const Route = createFileRoute("/_layout/beneficiaries")({
  component: Beneficiaries,
  validateSearch: (search) => beneficiariesSearchSchema.parse(search),
})

const PER_PAGE = 5

function getBeneficiariesQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      BeneficiariesService.readBeneficiaries({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["beneficiaries", { page }],
  }
}

function BeneficiariesTable() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const setPage = (page: number) =>
    navigate({ search: (prev: BeneficieriesSearchParams) => ({ ...prev, page }) })

  const {
    data: beneficiaries,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getBeneficiariesQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && beneficiaries?.data.length === PER_PAGE
  const hasPreviousPage = page > 1

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getBeneficiariesQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient])

  return (
    <>
      <TableContainer>
        <Table size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.id')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.id')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.title')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.title')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.name')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.name')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.accountType')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.accountType')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.countryCode')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.countryCode')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.destinationCountry')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.destinationCountry')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.destinationCurrency')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.destinationCurrency')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.payoutMethod')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.payoutMethod')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.accountNumber')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.routingCodeType')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.routingCodeType')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.routingCodeType')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.routingCodeValue')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.routingCodeValue')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.hashId')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.hashId')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.description')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.description')}</div>
                </Tooltip>
              </Th>
              <Th>
                <Tooltip label={t('beneficiaries.tooltips.actions')}>
                  <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('beneficiaries.table.actions')}</div>
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
              {beneficiaries?.data.map((beneficiary) => (
                <Tr key={beneficiary.id} opacity={isPlaceholderData ? 0.5 : 1}>
                  <Td>{beneficiary.id}</Td>
                  <Td>{beneficiary.title}</Td>
                  <Td>{beneficiary.beneficiaryName}</Td>
                  <Td>{beneficiary.beneficiaryAccountType}</Td>
                  <Td>{beneficiary.beneficiaryCountryCode}</Td>
                  <Td>{beneficiary.destinationCountry}</Td>
                  <Td>{beneficiary.destinationCurrency}</Td>
                  <Td>{beneficiary.payoutMethod}</Td>
                  <Td>{beneficiary.beneficiaryAccountNumber}</Td>
                  <Td>{beneficiary.routingCodeType1}</Td>
                  <Td>{beneficiary.routingCodeValue1}</Td>
                  <Td color={!beneficiary.beneficiaryHashId ? "ui.dim" : "inherit"}>
                    {beneficiary.beneficiaryHashId || "N/A"}
                  </Td>
                  <Td color={!beneficiary.description ? "ui.dim" : "inherit"}>
                    {beneficiary.description || "N/A"}
                  </Td>
                  <Td>
                    <ActionsMenu type={"Beneficiary"} value={beneficiary} />
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

function Beneficiaries() {
  const { t } = useTranslation()
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        {t('beneficiaries.title')}
      </Heading>
      <Navbar type={"Beneficiary"} />
      <BeneficiariesTable />
    </Container>
  )
}
  
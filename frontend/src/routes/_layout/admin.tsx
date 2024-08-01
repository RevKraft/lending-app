import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from 'react-i18next'
import { Suspense } from "react"
import { type UserPublic, UsersService } from "../../client"
import ActionsMenu from "../../components/Common/ActionsMenu"
import Navbar from "../../components/Common/Navbar"

export const Route = createFileRoute("/_layout/admin")({
  component: Admin,
})

const MembersTableBody = () => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const { data: users } = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: () => UsersService.readUsers({}),
  })

  return (
    <Tbody>
      {users.data.map((user) => (
        <Tr key={user.id}>
          <Td color={!user.full_name ? "ui.dim" : "inherit"}>
            {user.full_name || "N/A"}
            {currentUser?.id === user.id && (
              <Badge ml="1" colorScheme="teal">
                You
              </Badge>
            )}
          </Td>
          <Td>{user.email}</Td>
          <Td>{user.is_superuser ? "Superuser" : "User"}</Td>
          <Td>
            <Flex direction="column" gap={2}>
              <Flex gap={2}>
                <Box
                  w="2"
                  h="2"
                  borderRadius="50%"
                  bg={user.is_active ? "ui.success" : "ui.danger"}
                  alignSelf="center"
                />
                {user.is_active ? "Active" : "Inactive"}
              </Flex>
              <Flex gap={2}>
                <Box
                  w="2"
                  h="2"
                  borderRadius="50%"
                  bg={user.is_onboarded ? "ui.success" : "ui.danger"}
                  alignSelf="center"
                />
                {user.is_onboarded ? "Onboarded" : "Not Onboarded"}
              </Flex>
            </Flex>
          </Td>
          <Td>
            <ActionsMenu
              type="User"
              value={user}
              disabled={currentUser?.id === user.id ? true : false}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  )
}

const MembersBodySkeleton = () => {
  return (
    <Tbody>
      <Tr>
        {new Array(5).fill(null).map((_, index) => (
          <Td key={index}>
            <SkeletonText noOfLines={1} paddingBlock="16px" />
          </Td>
        ))}
      </Tr>
    </Tbody>
  )
}

function Admin() {
  const { t } = useTranslation()
  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
        {t('admin.title')}
      </Heading>
      <Navbar type={"User"} />
      <TableContainer>
        <Table fontSize="md" size={{ base: "sm", md: "md" }}>
          <Thead>
            <Tr>
              <Th width="20%"><div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('admin.table.fullName')}</div></Th>
              <Th width="50%"><div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('admin.table.email')}</div></Th>
              <Th width="10%"><div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('admin.table.role')}</div></Th>
              <Th width="10%"><div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('admin.table.status')}</div></Th>
              <Th width="10%"><div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center', hyphens: 'auto', textTransform: 'none'}}>{t('admin.table.actions')}</div></Th>
            </Tr>
          </Thead>
          <Suspense fallback={<MembersBodySkeleton />}>
            <MembersTableBody />
          </Suspense>
        </Table>
      </TableContainer>
    </Container>
  )
}

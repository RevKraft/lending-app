import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from 'react-i18next'
import useAuth from "../../hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { t } = useTranslation()
  const { user: currentUser } = useAuth()

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
          {t('index.hi')} {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>{t('index.greetings')}</Text>
        </Box>
      </Container>
    </>
  )
}

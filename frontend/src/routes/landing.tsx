import {
  Container,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react"
import {
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { isLoggedIn } from "../hooks/useAuth"

import Logo from "/assets/images/logo.svg"


export const Route = createFileRoute("/landing")({
  component: Landing,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function Landing() {
    return (
    <Container maxW="container.md" py={8}>
        <Image
            src={Logo}
            alt="RemmitFin logo"
            height="auto"
            maxW="2xs"
            alignSelf="center"
            mb={4}
        />
        <Heading as="h1" mb={4}>
        Welcome to Latam Remit
        </Heading>
        <Text fontSize="lg">
        This is the landing page of our application.
        </Text>
    </Container>
    )
}

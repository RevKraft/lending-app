import {
  Box,
  Container,
  Heading,
  Link,
} from "@chakra-ui/react"


const Onboarding = () => {

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          Onboarding Process
        </Heading>
        <Box>
          <Link href="https://signup.metamap.com/?merchantToken=64594bd09564b4001b579582&flowId=654bda640b776c001cacde48" color="blue.500">
            Identity Validation...
          </Link>
        </Box>
      </Container>
    </>
  )
}
export default Onboarding

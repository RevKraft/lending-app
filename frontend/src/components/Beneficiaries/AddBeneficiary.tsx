import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  CSSReset,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Global } from "@emotion/react"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, type BeneficiaryCreate, BeneficiariesService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface AddBeneficiaryProps {
  isOpen: boolean
  onClose: () => void
}

const AddBeneficiary = ({ isOpen, onClose }: AddBeneficiaryProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BeneficiaryCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: BeneficiaryCreate) =>
      BeneficiariesService.createBeneficiary({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Beneficiary created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = (err.body as any)?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["beneficiaries"] })
    },
  })

  const onSubmit: SubmitHandler<BeneficiaryCreate> = (data) => {
    console.log('Submitting Beneficiary:', data);
    mutation.mutate(data)
  }

  return (
    <>
      <CSSReset />
      <Global
        styles={`
          * {
            font-family: 'Roboto', sans-serif;
          }
        `}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Beneficiary</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                {...register("title", {
                  required: "Title is required.",
                })}
                placeholder="Title"
                type="text"
              />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.beneficiaryName}>
              <FormLabel htmlFor="beneficiaryName">Beneficiary Name</FormLabel>
              <Input
                id="beneficiaryName"
                {...register("beneficiaryName", {
                  required: "Beneficiary Name is required.",
                })}
                placeholder="Jon Doe"
                type="text"
              />
              {errors.beneficiaryName && (
                <FormErrorMessage>{errors.beneficiaryName.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.beneficiaryAccountType}>
              <FormLabel htmlFor="beneficiaryAccountType">Beneficiary Account Type</FormLabel>
              <Input
                id="beneficiaryAccountType"
                {...register("beneficiaryAccountType", {
                  required: "Beneficiary Account Type is required.",
                })}
                placeholder="Individual"
                type="text"
              />
              {errors.beneficiaryAccountType && (
                <FormErrorMessage>{errors.beneficiaryAccountType.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.beneficiaryCountryCode}>
              <FormLabel htmlFor="beneficiaryCountryCode">Beneficiary Country Code</FormLabel>
              <Input
                id="beneficiaryCountryCode"
                {...register("beneficiaryCountryCode", {
                  required: "Beneficiary Country Code is required.",
                })}
                placeholder="US"
                type="text"
              />
              {errors.beneficiaryCountryCode && (
                <FormErrorMessage>{errors.beneficiaryCountryCode.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.destinationCountry}>
              <FormLabel htmlFor="destinationCountry">Destination Country</FormLabel>
              <Input
                id="destinationCountry"
                {...register("destinationCountry", {
                  required: "Destination Country is required.",
                })}
                placeholder="US"
                type="text"
              />
              {errors.destinationCountry && (
                <FormErrorMessage>{errors.destinationCountry.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.destinationCurrency}>
              <FormLabel htmlFor="destinationCurrency">Destination Currency</FormLabel>
              <Input
                id="destinationCurrency"
                {...register("destinationCurrency", {
                  required: "Destination Currency is required.",
                })}
                placeholder="USD"
                type="text"
              />
              {errors.destinationCurrency && (
                <FormErrorMessage>{errors.destinationCurrency.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.payoutMethod}>
              <FormLabel htmlFor="payoutMethod">Payout Method</FormLabel>
              <Input
                id="payoutMethod"
                {...register("payoutMethod", {
                  required: "Payout Method is required.",
                })}
                placeholder="LOCAL"
                type="text"
              />
              {errors.payoutMethod && (
                <FormErrorMessage>{errors.payoutMethod.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.beneficiaryAccountNumber}>
              <FormLabel htmlFor="beneficiaryAccountNumber">Beneficiary Account Number</FormLabel>
              <Input
                id="beneficiaryAccountNumber"
                {...register("beneficiaryAccountNumber", {
                  required: "Beneficiary Account Number is required.",
                })}
                placeholder="235689856"
                type="text"
              />
              {errors.beneficiaryAccountNumber && (
                <FormErrorMessage>{errors.beneficiaryAccountNumber.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.routingCodeType1}>
              <FormLabel htmlFor="routingCodeType1">Routing Code Type</FormLabel>
              <Input
                id="routingCodeType1"
                {...register("routingCodeType1", {
                  required: "Routing Code Type is required.",
                })}
                placeholder="SWIFT"
                type="text"
              />
              {errors.routingCodeType1 && (
                <FormErrorMessage>{errors.routingCodeType1.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.routingCodeValue1}>
              <FormLabel htmlFor="routingCodeValue1">Routing Code Value</FormLabel>
              <Input
                id="routingCodeValue1"
                {...register("routingCodeValue1", {
                  required: "Routing Code Value is required.",
                })}
                placeholder="DBSSUSUS"
                type="text"
              />
              {errors.routingCodeValue1 && (
                <FormErrorMessage>{errors.routingCodeValue1.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="beneficiaryHashId">Beneficiary Hash Id</FormLabel>
              <Input
                id="beneficiaryHashId"
                {...register("beneficiaryHashId")}
                placeholder="660ba867f9fcab54bcde40e3"
                type="text"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input
                id="description"
                {...register("description")}
                placeholder="Description"
                type="text"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddBeneficiary

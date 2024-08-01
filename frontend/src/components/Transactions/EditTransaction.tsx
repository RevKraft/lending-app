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

import {
  type ApiError,
  type TransactionPublic,
  type TransactionUpdate,
  TransactionsService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface EditTransactionProps {
  transaction: TransactionPublic
  isOpen: boolean
  onClose: () => void
}

const EditTransaction = ({ transaction, isOpen, onClose }: EditTransactionProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<TransactionUpdate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: transaction,
  })

  const mutation = useMutation({
    mutationFn: (data: TransactionUpdate) =>
      TransactionsService.updateTransaction({ id: transaction.id, requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Transaction updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = (err.body as any)?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
    },
  })

  const onSubmit: SubmitHandler<TransactionUpdate> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
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
          <ModalHeader>Edit Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.title}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                {...register("title", {
                  required: "Title is required",
                })}
                type="text"
              />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.beneficiaryId}>
              <FormLabel htmlFor="beneficiaryId">Beneficiary Id</FormLabel>
              <Input
                id="beneficiaryId"
                {...register("beneficiaryId", {
                  required: "Beneficiary Id is required.",
                })}
                placeholder="660ee40ff9fcab54bcdec4fa"
                type="text"
              />
              {errors.beneficiaryId && (
                <FormErrorMessage>{errors.beneficiaryId.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.payout_source_amount}>
              <FormLabel htmlFor="payout_source_amount">Payout Source Amount</FormLabel>
              <Input
                id="payout_source_amount"
                {...register("payout_source_amount", {
                  required: "Payout Source Amount is required.",
                })}
                placeholder="500"
                type="text"
              />
              {errors.payout_source_amount && (
                <FormErrorMessage>{errors.payout_source_amount.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.payout_source_currency}>
              <FormLabel htmlFor="payout_source_currency">Payout Source Currency</FormLabel>
              <Input
                id="payout_source_currency"
                {...register("payout_source_currency", {
                  required: "Payout Source Currency is required.",
                })}
                placeholder="USD"
                type="text"
              />
              {errors.payout_source_currency && (
                <FormErrorMessage>{errors.payout_source_currency.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Input
                id="message"
                {...register("message")}
                placeholder="Transfer Initiated"
                type="text"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="payment_id">Payment Id</FormLabel>
              <Input
                id="payment_id"
                {...register("payment_id")}
                placeholder="12345"
                type="text"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="system_reference_number">System Reference Number</FormLabel>
              <Input
                id="system_reference_number"
                {...register("system_reference_number")}
                placeholder="RT0710486913"
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
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
            >
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditTransaction

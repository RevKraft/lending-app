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

import { type ApiError, type ItemCreate, ItemsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"

interface AddItemProps {
  isOpen: boolean
  onClose: () => void
}

const AddItem = ({ isOpen, onClose }: AddItemProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ItemCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: ItemCreate) =>
      ItemsService.createItem({ requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Item created successfully.", "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      const errDetail = (err.body as any)?.detail
      showToast("Something went wrong.", `${errDetail}`, "error")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })

  const onSubmit: SubmitHandler<ItemCreate> = (data) => {
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
          <ModalHeader>Add Item</ModalHeader>
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
            <FormControl isRequired isInvalid={!!errors.walletHashId}>
              <FormLabel htmlFor="walletHashId">Wallet Hash Id</FormLabel>
              <Input
                id="walletHashId"
                {...register("walletHashId", {
                  required: "Wallet Hash Id is required.",
                })}
                placeholder="1e2d2de7-7c95-4c04-b7a7-7e14784ddd52"
                type="text"
              />
              {errors.walletHashId && (
                <FormErrorMessage>{errors.walletHashId.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.status}>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Input
                id="status"
                {...register("status", {
                  required: "Status is required.",
                })}
                placeholder="Pending"
                type="text"
              />
              {errors.status && (
                <FormErrorMessage>{errors.status.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.regulatoryRegion}>
              <FormLabel htmlFor="regulatoryRegion">Regulatory Region</FormLabel>
              <Input
                id="regulatoryRegion"
                {...register("regulatoryRegion", {
                  required: "Regulatory Region is required.",
                })}
                placeholder="US"
                type="text"
              />
              {errors.regulatoryRegion && (
                <FormErrorMessage>{errors.regulatoryRegion.message}</FormErrorMessage>
              )}
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

export default AddItem

import { Button, Flex, Icon, useDisclosure } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"

import AddUser from "../Admin/AddUser"
import AddItem from "../Items/AddItem"
import AddTransaction from "../Transactions/AddTransaction"
import AddBeneficiary from "../Beneficiaries/AddBeneficiary"

interface NavbarProps {
  type: string
}

const Navbar = ({ type }: NavbarProps) => {
  const addUserModal = useDisclosure()
  const addItemModal = useDisclosure()
  const addTransactionModal = useDisclosure()
  const addBeneficiaryModal = useDisclosure()

  const handleButtonClick = () => {
    console.log('Button clicked, type:', type);
    if (type === "User") {
      addUserModal.onOpen();
    } else if (type === "Item") {
      addItemModal.onOpen();
    } else if (type === "Transaction") {
      addTransactionModal.onOpen();
    } else if (type === "Beneficiary") {
      addBeneficiaryModal.onOpen();
    }
  };

  return (
    <>
      <Flex py={8} gap={4}>
        {/* TODO: Complete search functionality */}
        {/* <InputGroup w={{ base: '100%', md: 'auto' }}>
                    <InputLeftElement pointerEvents='none'>
                        <Icon as={FaSearch} color='ui.dim' />
                    </InputLeftElement>
                    <Input type='text' placeholder='Search' fontSize={{ base: 'sm', md: 'inherit' }} borderRadius='8px' />
                </InputGroup> */}
        <Button
          variant="primary"
          gap={1}
          fontSize={{ base: "sm", md: "inherit" }}
          onClick={handleButtonClick}>
          <Icon as={FaPlus} /> Add {type}
        </Button>
        <AddUser isOpen={addUserModal.isOpen} onClose={addUserModal.onClose} />
        <AddItem isOpen={addItemModal.isOpen} onClose={addItemModal.onClose} />
        <AddTransaction isOpen={addTransactionModal.isOpen} onClose={addTransactionModal.onClose} />
        <AddBeneficiary isOpen={addBeneficiaryModal.isOpen} onClose={addBeneficiaryModal.onClose} />
      </Flex>
    </>
  )
}

export default Navbar

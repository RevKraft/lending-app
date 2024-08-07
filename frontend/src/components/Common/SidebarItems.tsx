import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { FiHome, FiSettings, FiUsers, FiDollarSign, FiUser, FiCreditCard } from "react-icons/fi"

import type { UserPublic } from "../../client"

const items = [
  { icon: FiHome, title: "Dashboard", path: "/" },
  { icon: FiCreditCard, title: "1 Items", path: "/items" },
  { icon: FiUsers, title: "2 Beneficiaries", path: "/beneficiaries" },
  { icon: FiDollarSign, title: "3 Transactions", path: "/transactions" },
  { icon: FiSettings, title: "User Settings", path: "/settings" },
]

interface SidebarItemsProps {
  onClose?: () => void
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const queryClient = useQueryClient()
  const textColor = useColorModeValue("ui.main", "ui.light")
  const bgActive = useColorModeValue("#E2E8F0", "#4A5568")
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const finalItems = currentUser?.is_superuser
    ? [...items.slice(0, 4), { icon: FiUser, title: "Admin", path: "/admin" }, ...items.slice(4),]
    : items

  const listItems = finalItems.map(({ icon, title, path }) => (
    <Flex
      as={Link}
      to={path}
      w="100%"
      p={2}
      key={title}
      activeProps={{
        style: {
          background: bgActive,
          borderRadius: "12px",
        },
      }}
      color={textColor}
      onClick={onClose}
    >
      <Icon as={icon} alignSelf="center" />
      <Text ml={2}>{title}</Text>
    </Flex>
  ))

  return (
    <>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems

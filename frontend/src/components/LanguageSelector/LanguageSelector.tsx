import { useTranslation } from 'react-i18next'
import { Button, HStack, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import ReactCountryFlag from "react-country-flag"
import { ChevronDownIcon } from "@chakra-ui/icons"

const languageOptions = [
  { code: 'en-US', label: 'US English', countryCode: 'US' },
  { code: 'es', label: 'Spanish', countryCode: 'ES' },
  { code: 'en-GB', label: 'UK English', countryCode: 'GB' },
  { code: 'pt-BR', label: 'Brazilian Portuguese', countryCode: 'BR' },
  { code: 'pt-PT', label: 'Portugal Portuguese', countryCode: 'PT' },
  { code: 'de', label: 'German', countryCode: 'DE' },
  { code: 'fr', label: 'French', countryCode: 'FR' },
  { code: 'it', label: 'Italian', countryCode: 'IT' },
  { code: 'zh', label: 'Chinese', countryCode: 'CN' },
  { code: 'hi', label: 'Hindi', countryCode: 'IN' },
  { code: 'ru', label: 'Russian', countryCode: 'RU' },
  { code: 'tr', label: 'Turkish', countryCode: 'TR' },
  { code: 'ko', label: 'South Korean', countryCode: 'KR' },
]

function LanguageSelector() {
  const { i18n } = useTranslation()
  const currentLanguage = languageOptions.find(option => option.code === i18n.language)


  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <ReactCountryFlag countryCode={currentLanguage?.countryCode || 'US'} svg style={{ width: '1.5em', height: '1.5em' }} />
      </MenuButton>
      <MenuList>
        {languageOptions.map(option => (
          <MenuItem key={option.code} onClick={() => changeLanguage(option.code)}>
            <HStack>
              <ReactCountryFlag countryCode={option.countryCode} svg style={{ width: '1em', height: '1em' }} />
              <span>{option.label}</span>
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default LanguageSelector

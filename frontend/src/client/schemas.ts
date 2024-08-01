export const $Body_login_login_access_token = {
  properties: {
    grant_type: {
      type: "any-of",
      contains: [
        {
          type: "string",
          pattern: "password",
        },
        {
          type: "null",
        },
      ],
    },
    username: {
      type: "string",
      isRequired: true,
    },
    password: {
      type: "string",
      isRequired: true,
    },
    scope: {
      type: "string",
      default: "",
    },
    client_id: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    client_secret: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $HTTPValidationError = {
  properties: {
    detail: {
      type: "array",
      contains: {
        type: "ValidationError",
      },
    },
  },
} as const

export const $ItemCreate = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    walletHashId: {
      type: "string",
      isRequired: true,
    },
    status: {
      type: "string",
      isRequired: true,
    },
    regulatoryRegion: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $ItemPublic = {
  properties: {
    title: {
      type: "string",
      isRequired: true,
    },
    walletHashId: {
      type: "string",
      isRequired: true,
    },
    status: {
      type: "string",
      isRequired: true,
    },
    regulatoryRegion: {
      type: "string",
      isRequired: true,
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "number",
      isRequired: true,
    },
    owner_id: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $ItemUpdate = {
  properties: {
    title: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    description: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $ItemsPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "ItemPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $TransactionCreate = {
	properties: {
		title: {
	type: 'string',
	isRequired: true,
},
    beneficiaryId: {
	type: 'string',
	isRequired: true,
},
    payout_source_amount: {
	type: 'string',
	isRequired: true,
},
    payout_source_currency: {
	type: 'string',
	isRequired: true,
},
    message: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
    payment_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
    system_reference_number: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const

export const $TransactionPublic = {
	properties: {
		title: {
	type: 'string',
	isRequired: true,
},
    beneficiaryId: {
	type: 'string',
	isRequired: true,
},
    payout_source_amount: {
	type: 'string',
	isRequired: true,
},
    payout_source_currency: {
	type: 'string',
	isRequired: true,
},
    message: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
    payment_id: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
    system_reference_number: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		id: {
	type: 'number',
	isRequired: true,
},
		owner_id: {
	type: 'number',
	isRequired: true,
},
	},
} as const

export const $TransactionUpdate = {
	properties: {
		title: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const

export const $TransactionsPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'TransactionPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const

export const $BeneficiaryCreate = {
	properties: {
		title: {
	type: 'string',
	isRequired: true,
},
    beneficiaryName: {
	type: 'string',
	isRequired: true,
},
    beneficiaryAccountType: {
	type: 'string',
	isRequired: true,
},
    beneficiaryCountryCode: {
	type: 'string',
	isRequired: true,
},
    destinationCountry: {
	type: 'string',
	isRequired: true,
},
    destinationCurrency: {
	type: 'string',
	isRequired: true,
},
    payoutMethod: {
	type: 'string',
	isRequired: true,
},
    beneficiaryAccountNumber: {
	type: 'string',
	isRequired: true,
},
    routingCodeType1: {
	type: 'string',
	isRequired: true,
},
    routingCodeValue1: {
	type: 'string',
	isRequired: true,
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $BeneficiaryPublic = {
	properties: {
		title: {
	type: 'string',
	isRequired: true,
},
    beneficiaryName: {
	type: 'string',
	isRequired: true,
},
    beneficiaryAccountType: {
	type: 'string',
	isRequired: true,
},
    beneficiaryCountryCode: {
	type: 'string',
	isRequired: true,
},
    destinationCountry: {
	type: 'string',
	isRequired: true,
},
    destinationCurrency: {
	type: 'string',
	isRequired: true,
},
    payoutMethod: {
	type: 'string',
	isRequired: true,
},
    beneficiaryAccountNumber: {
	type: 'string',
	isRequired: true,
},
    routingCodeType1: {
	type: 'string',
	isRequired: true,
},
    routingCodeValue1: {
	type: 'string',
	isRequired: true,
},
  beneficiaryHashId: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		id: {
	type: 'number',
	isRequired: true,
},
		owner_id: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $BeneficiaryUpdate = {
	properties: {
		title: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
		description: {
	type: 'any-of',
	contains: [{
	type: 'string',
}, {
	type: 'null',
}],
},
	},
} as const;

export const $BeneficiariesPublic = {
	properties: {
		data: {
	type: 'array',
	contains: {
		type: 'BeneficiaryPublic',
	},
	isRequired: true,
},
		count: {
	type: 'number',
	isRequired: true,
},
	},
} as const;

export const $Message = {
  properties: {
    message: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $NewPassword = {
  properties: {
    token: {
      type: "string",
      isRequired: true,
    },
    new_password: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $Token = {
  properties: {
    access_token: {
      type: "string",
      isRequired: true,
    },
    token_type: {
      type: "string",
      default: "bearer",
    },
  },
} as const

export const $UpdatePassword = {
  properties: {
    current_password: {
      type: "string",
      isRequired: true,
    },
    new_password: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $UserCreate = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_onboarded: {
      type: "boolean",
      default: false,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    password: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export const $UserPublic = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_onboarded: {
      type: "boolean",
      default: false,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    id: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $UserRegister = {
  properties: {
    email: {
      type: "string",
      isRequired: true,
    },
    password: {
      type: "string",
      isRequired: true,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UserUpdate = {
  properties: {
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    is_active: {
      type: "boolean",
      default: true,
    },
    is_onboarded: {
      type: "boolean",
      default: false,
    },
    is_superuser: {
      type: "boolean",
      default: false,
    },
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    password: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UserUpdateMe = {
  properties: {
    full_name: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
    email: {
      type: "any-of",
      contains: [
        {
          type: "string",
        },
        {
          type: "null",
        },
      ],
    },
  },
} as const

export const $UsersPublic = {
  properties: {
    data: {
      type: "array",
      contains: {
        type: "UserPublic",
      },
      isRequired: true,
    },
    count: {
      type: "number",
      isRequired: true,
    },
  },
} as const

export const $ValidationError = {
  properties: {
    loc: {
      type: "array",
      contains: {
        type: "any-of",
        contains: [
          {
            type: "string",
          },
          {
            type: "number",
          },
        ],
      },
      isRequired: true,
    },
    msg: {
      type: "string",
      isRequired: true,
    },
    type: {
      type: "string",
      isRequired: true,
    },
  },
} as const

export interface TextingPlatform {
  name: string;
  website: string;
  logo?: string;
  customFromNumber: {
    available: boolean;
    details: string;
    cost?: string;
  };
  esimSupport: {
    available: boolean;
    details: string;
    providers?: string[];
  };
  pricing: {
    freeTier: boolean;
    plans: {
      name: string;
      price: string;
      features: string[];
    }[];
    additionalCosts?: string[];
  };
  pros: string[];
  cons: string[];
  features: string[];
}

export const textingPlatforms: TextingPlatform[] = [
  {
    name: "Google Messages",
    website: "https://messages.google.com",
    customFromNumber: {
      available: true,
      details: "Uses your actual phone number from your Android device",
      cost: "Free - included with Android"
    },
    esimSupport: {
      available: true,
      details: "Works with any eSIM or physical SIM on your Android device",
      providers: ["Any carrier supporting Android"]
    },
    pricing: {
      freeTier: true,
      plans: [
        {
          name: "Free",
          price: "$0/month",
          features: ["Unlimited SMS/MMS", "RCS messaging", "Web interface", "Message sync", "Group messaging"]
        }
      ]
    },
    pros: [
      "Completely free",
      "Native Android integration",
      "RCS (Rich Communication Services) support",
      "End-to-end encryption for RCS",
      "Seamless sync between phone and web",
      "High-quality media sharing",
      "Read receipts and typing indicators",
      "Works with any Android phone"
    ],
    cons: [
      "Requires Android phone",
      "Limited to Android ecosystem",
      "Requires phone to be connected for web interface",
      "RCS features depend on carrier support",
      "No iOS support",
      "Web interface has limited functionality compared to phone"
    ],
    features: [
      "SMS/MMS messaging",
      "RCS messaging",
      "Web interface",
      "Message sync",
      "Group messaging",
      "Media sharing",
      "Message scheduling",
      "Smart replies"
    ]
  },
  {
    name: "MightyText",
    website: "https://mightytext.net",
    customFromNumber: {
      available: true,
      details: "Send texts from your computer using your actual phone number",
      cost: "Included with service"
    },
    esimSupport: {
      available: false,
      details: "Does not directly support eSIM, but works with any SIM/eSIM enabled phone"
    },
    pricing: {
      freeTier: true,
      plans: [
        {
          name: "Free",
          price: "$0/month",
          features: ["100 texts/month", "Basic messaging", "Computer sync"]
        },
        {
          name: "Pro",
          price: "$4.99/month",
          features: ["Unlimited texts", "Photo/video messaging", "Contact sync", "Message scheduling"]
        }
      ]
    },
    pros: [
      "Uses your actual phone number",
      "Seamless sync between devices",
      "Good free tier",
      "Easy setup",
      "Photo/video support"
    ],
    cons: [
      "Requires your phone to be connected",
      "Limited customization options",
      "No virtual numbers",
      "Android focus (limited iOS support)"
    ],
    features: [
      "Text from computer",
      "Message sync",
      "Contact management",
      "Photo/video messaging",
      "Message scheduling"
    ]
  },
  {
    name: "Google Voice",
    website: "https://voice.google.com",
    customFromNumber: {
      available: true,
      details: "Get a free Google Voice number or port your existing number",
      cost: "Free for new number, $20 to port existing number"
    },
    esimSupport: {
      available: true,
      details: "Works with eSIM through Google Fi integration and data connections",
      providers: ["Google Fi", "Any data provider"]
    },
    pricing: {
      freeTier: true,
      plans: [
        {
          name: "Personal",
          price: "Free",
          features: ["Free US number", "Voicemail transcription", "Call forwarding", "Text messaging"]
        },
        {
          name: "Google Workspace",
          price: "$10/user/month",
          features: ["Business features", "Advanced admin controls", "24/7 support"]
        }
      ],
      additionalCosts: ["International calling rates", "Number porting fee ($20)"]
    },
    pros: [
      "Completely free for basic use",
      "True virtual number",
      "Works on any device",
      "Excellent spam filtering",
      "Voicemail transcription",
      "Integration with Google services"
    ],
    cons: [
      "Limited SMS features",
      "Can't send photos via SMS easily",
      "Number can be reclaimed if unused",
      "Limited international support"
    ],
    features: [
      "Virtual phone number",
      "Cross-platform messaging",
      "Voicemail transcription",
      "Call forwarding",
      "Spam filtering"
    ]
  },
  {
    name: "Twilio",
    website: "https://twilio.com",
    customFromNumber: {
      available: true,
      details: "Purchase phone numbers from various countries and area codes",
      cost: "$1-15/month per number depending on location and type"
    },
    esimSupport: {
      available: true,
      details: "API-based service that works with any internet connection including eSIM data",
      providers: ["Any data provider"]
    },
    pricing: {
      freeTier: true,
      plans: [
        {
          name: "Pay-as-you-go",
          price: "$0.0075 per SMS",
          features: ["API access", "Global messaging", "Programmable SMS"]
        },
        {
          name: "Phone Numbers",
          price: "$1-15/month",
          features: ["Local/toll-free numbers", "International numbers", "Short codes"]
        }
      ],
      additionalCosts: [
        "SMS: $0.0075 per message",
        "MMS: $0.02 per message",
        "Phone number rental",
        "International rates vary"
      ]
    },
    pros: [
      "Highly programmable",
      "Global phone numbers",
      "Developer-friendly APIs",
      "Scalable for business",
      "Reliable delivery",
      "Advanced features (webhooks, etc.)"
    ],
    cons: [
      "Requires technical knowledge",
      "Can get expensive at scale",
      "No ready-made UI",
      "Complex pricing structure",
      "Overkill for simple use cases"
    ],
    features: [
      "Programmable SMS/MMS",
      "Global phone numbers",
      "Webhooks",
      "Two-factor authentication",
      "Bulk messaging",
      "Analytics"
    ]
  },
  {
    name: "TextNow",
    website: "https://textnow.com",
    customFromNumber: {
      available: true,
      details: "Free phone number from available area codes, premium numbers available",
      cost: "Free for basic number, $4.99/month for premium features"
    },
    esimSupport: {
      available: true,
      details: "App works over WiFi/data, including eSIM data connections",
      providers: ["Any data provider"]
    },
    pricing: {
      freeTier: true,
      plans: [
        {
          name: "Free",
          price: "$0/month",
          features: ["Free phone number", "Unlimited texts", "Limited calling", "Ads"]
        },
        {
          name: "Plus",
          price: "$4.99/month",
          features: ["Ad-free", "Voicemail transcription", "Custom voicemail", "Call forwarding"]
        },
        {
          name: "Pro",
          price: "$9.99/month",
          features: ["Everything in Plus", "Unlimited calling", "Premium support"]
        }
      ]
    },
    pros: [
      "Completely free option",
      "Works over WiFi/data only",
      "No carrier needed",
      "Good for secondary numbers",
      "Cross-platform apps"
    ],
    cons: [
      "Ads in free version",
      "Limited customer support",
      "Number can be reclaimed",
      "Call quality depends on connection",
      "Limited international features"
    ],
    features: [
      "Free phone number",
      "WiFi/data calling",
      "Text messaging",
      "Voicemail",
      "Call forwarding"
    ]
  },
  {
    name: "Sideline",
    website: "https://sideline.com",
    customFromNumber: {
      available: true,
      details: "Get a second phone number for your existing device",
      cost: "Included with subscription"
    },
    esimSupport: {
      available: true,
      details: "Works with any data connection including eSIM",
      providers: ["Any data provider"]
    },
    pricing: {
      freeTier: false,
      plans: [
        {
          name: "Pro",
          price: "$9.99/month",
          features: ["Second phone number", "Auto-reply", "Do not disturb", "Custom voicemail"]
        },
        {
          name: "Team",
          price: "$14.99/month per user",
          features: ["Everything in Pro", "Team messaging", "Shared numbers", "Admin controls"]
        }
      ]
    },
    pros: [
      "Professional features",
      "Good for business use",
      "Auto-reply functionality",
      "Clean interface",
      "Reliable service"
    ],
    cons: [
      "No free tier",
      "More expensive than alternatives",
      "Limited integrations",
      "Focused on US market"
    ],
    features: [
      "Second phone number",
      "Auto-reply",
      "Custom voicemail",
      "Do not disturb",
      "Team collaboration"
    ]
  }
];

export const esimProviders = [
  {
    name: "Airalo",
    website: "https://airalo.com",
    coverage: "Global",
    dataPlans: "Starting from $4.50",
    features: ["No physical SIM", "Instant activation", "Multiple data plans"]
  },
  {
    name: "Ubigi",
    website: "https://ubigi.com",
    coverage: "Global",
    dataPlans: "Pay-as-you-go from $1.90",
    features: ["Flexible plans", "Multiple countries", "Easy top-up"]
  },
  {
    name: "Google Fi",
    website: "https://fi.google.com",
    coverage: "200+ countries",
    dataPlans: "$20/month unlimited",
    features: ["Works with Google Voice", "VPN included", "International roaming"]
  },
  {
    name: "Nomad",
    website: "https://nomadinternet.com",
    coverage: "Global",
    dataPlans: "Various plans available",
    features: ["Travel-focused", "Multiple carriers", "Instant activation"]
  }
];

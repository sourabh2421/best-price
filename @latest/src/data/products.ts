export type ProductCategory = {
  slug: string
  title: string
  icon: string
  description: string
  items: string[]
}

export const productCategories: ProductCategory[] = [
  {
    slug: 'mobile-covers',
    title: 'Mobile Covers',
    icon: 'smartphone',
    description:
      'Protect your phone in style with durable covers for every taste and budget.',
    items: [
      'Silicone Covers',
      'Transparent Covers',
      'Printed Covers',
      'Leather Covers',
      'Shockproof Covers',
      'Designer Covers',
      'Flip Covers',
      'Rugged Armor Cases',
      'MagSafe Compatible Covers',
    ],
  },
  {
    slug: 'chargers-cables',
    title: 'Chargers & Cables',
    icon: 'plug-zap',
    description:
      'Reliable charging solutions for home, office, and on-the-go power.',
    items: [
      'Fast Chargers',
      'Type-C Cables',
      'Lightning Cables',
      'Micro USB Cables',
      'Car Chargers',
      'Multi-Port Chargers',
      'Wireless Chargers',
      'GaN Wall Adapters',
      'Braided Charging Cables',
    ],
  },
  {
    slug: 'earphones-headphones',
    title: 'Earphones & Headphones',
    icon: 'headphones',
    description:
      'Immersive audio from wired classics to the latest wireless earbuds.',
    items: [
      'Wired Earphones',
      'Wireless Earbuds',
      'Bluetooth Earphones',
      'Neckbands',
      'Over-Ear Headphones',
      'Gaming Headsets',
      'Type-C Digital Earphones',
      'Sports Earbuds',
    ],
  },
  {
    slug: 'screen-guards',
    title: 'Screen Guards',
    icon: 'shield',
    description:
      'Crystal-clear protection that keeps your display scratch-free and sharp.',
    items: [
      'Tempered Glass',
      'Privacy Screen Protectors',
      'Matte Screen Guards',
      'Camera Lens Protectors',
      'Edge-to-Edge Glass',
      'Hydrogel Film Protectors',
      'Anti-Glare Screen Guards',
    ],
  },
  {
    slug: 'power-banks-storage',
    title: 'Power Banks & Storage',
    icon: 'battery-charging',
    description:
      'Stay powered up and expand storage with trusted portable solutions.',
    items: [
      'Power Banks',
      'Memory Cards',
      'Pen Drives',
      'OTG Storage Devices',
      'Fast Charge Power Banks',
      'SD Card Readers',
      'Wireless Power Banks',
      'High-Speed USB Drives',
    ],
  },
  {
    slug: 'mobile-accessories',
    title: 'Mobile Accessories',
    icon: 'package',
    description:
      'Handy add-ons that make everyday phone use easier and more enjoyable.',
    items: [
      'Mobile Holders',
      'Selfie Sticks',
      'Pop Sockets',
      'Mobile Stands',
      'Ring Holders',
      'Car Mounts',
      'Cable Organizers',
      'Stylus Pens',
    ],
  },
  {
    slug: 'smart-gadgets',
    title: 'Smart Gadgets',
    icon: 'sparkles',
    description:
      'Upgrade your tech lifestyle with connected speakers, watches, and more.',
    items: [
      'Bluetooth Speakers',
      'Smart Watches',
      'Fitness Bands',
      'Mobile Tripods',
      'TWS Charging Cases',
      'Mini Ring Lights',
      'Smart Tags',
    ],
  },
  {
    slug: 'mobile-repair-services',
    title: 'Mobile Repair Services',
    icon: 'wrench',
    description:
      'Expert repairs and servicing to get your device running like new again.',
    items: [
      'Screen Replacement',
      'Battery Replacement',
      'Charging Port Repair',
      'Speaker Repair',
      'Software Updates',
      'General Mobile Servicing',
      'Camera Module Repair',
      'Water Damage Recovery',
      'Back Panel Replacement',
    ],
  },
]

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return productCategories.find((category) => category.slug === slug)
}

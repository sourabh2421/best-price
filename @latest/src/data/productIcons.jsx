import {
  BatteryCharging,
  Headphones,
  PlugZap,
  Shield,
  Smartphone,
  Sparkles,
  Wrench,
  Package,
} from 'lucide-react'

export const productIconMap = {
  smartphone: Smartphone,
  'plug-zap': PlugZap,
  headphones: Headphones,
  shield: Shield,
  'battery-charging': BatteryCharging,
  package: Package,
  sparkles: Sparkles,
  wrench: Wrench,
}

export function getProductIcon(iconKey) {
  return productIconMap[iconKey] ?? Package
}

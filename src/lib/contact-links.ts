// tel:, WhatsApp click-to-chat URL builders.

/** Keep digits and a leading plus, so "+880 1711-000000" becomes "+8801711000000". */
function normalisePhone(phone: string): string {
  const trimmed = phone.trim()
  const digits = trimmed.replace(/\D/g, '')
  return trimmed.startsWith('+') ? `+${digits}` : digits
}

export function telHref(phone: string): string {
  return `tel:${normalisePhone(phone)}`
}

/** WhatsApp click-to-chat. wa.me expects the number in international format without "+". */
export function whatsappHref(phone: string, message?: string): string {
  const number = normalisePhone(phone).replace(/^\+/, '')
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${text}`
}

export function mailtoHref(email: string): string {
  return `mailto:${email}`
}

/** Google Maps search link for a point. Opens the app on phones. */
export function mapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
}

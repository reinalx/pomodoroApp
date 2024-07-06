export function parseTime (totalSegundos) {
  const horas = Math.floor(totalSegundos / 3600)
  const minutos = Math.floor((totalSegundos % 3600) / 60)
  const segundos = totalSegundos % 60

  // Asegurarse de que siempre haya dos dígitos para minutos y segundos
  const horasStr = horas.toString().padStart(2, '0')
  const minutosStr = minutos.toString().padStart(2, '0')
  const segundosStr = segundos.toString().padStart(2, '0')

  return `${horasStr}:${minutosStr}:${segundosStr}`
}

// DEPRECATED
export function generateRandomId () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

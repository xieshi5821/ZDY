export const formatFullDate = (date) => {
  return `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(6, 2)} ${date.substr(8, 2)}:${date.substr(10, 2)}:${date.substr(12, 2)}`
}

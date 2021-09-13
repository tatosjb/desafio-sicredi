function formatDate(date){
  if([null, ''].includes(date)) return ''

  return Intl.DateTimeFormat('pt-BR').format(date)
}

export default function DateSpan({ date }) {
  return <span>{formatDate(date)}</span>
}

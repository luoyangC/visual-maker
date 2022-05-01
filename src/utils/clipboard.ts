export function copy(t: any) {
  const transfer = document.createElement('textarea')

  document.body.appendChild(transfer)
  transfer.value = t.text
  transfer.focus()
  transfer.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
  }
  transfer.blur()
  document.body.removeChild(transfer)
}

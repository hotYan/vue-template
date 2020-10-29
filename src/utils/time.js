
export function formatTime(time) {
  // debugger
  if (!time) return '-'
  const oldDate = new Date(time)
  const year = oldDate.getFullYear()
  const month = oldDate.getMonth() + 1
  const day = oldDate.getDate()
  const hour = oldDate.getHours()
  const minute = oldDate.getMinutes()
  const second = oldDate.getSeconds()
  return year + '-' + getzf(month) + '-' + getzf(day) + ' ' + getzf(hour) + ':' + getzf(minute) + ':' + getzf(second)
}
function getzf(num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}

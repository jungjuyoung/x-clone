export const preventScroll = () => {
  document.body.style.position = "fixed"
  document.body.style.width = "100%"
  document.body.style.overflowY = "hidden"
  document.documentElement.style.scrollBehavior = "auto"
}

export const allowScroll = () => {
  document.body.style.position = ""
  document.body.style.width = ""
  document.body.style.overflowY = ""
}
const search = document.getElementById("search")
const icons = document.querySelectorAll(".icon")
const notification = document.getElementById("notification")
const notificationText = document.getElementById("notification-text")
let timer

for (const icon of icons) {
  icon.addEventListener("click", (e) => {
    const { name, codepoint } = e.currentTarget.dataset

    navigator.clipboard.writeText(String.fromCodePoint(codepoint))
    notificationText.innerText = name
    search.focus()

    animate()
  })
}

function animate() {
  window.clearTimeout(timer)
  notification.classList.remove("opacity-0")
  notification.classList.add("opacity-90")

  timer = window.setTimeout(() => {
    notification.classList.remove("opacity-90")
    notification.classList.add("opacity-0")
  }, 3000)
}

search.addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase()

  for (const icon of icons) {
    const name = icon.dataset.name.toLowerCase()
    icon.style.display = name.includes(query) ? "" : "none"
  }
})

const search = document.getElementById("search")
const icons = document.querySelectorAll(".icon")
const notification = document.getElementById("notification")
const notificationText = document.getElementById("notification-text")
const emptyState = document.getElementById("empty-state")

let timer

// Auto-fill the search input with the query param
const params = new URLSearchParams(window.location.search)
search.value = params.get("q") ?? ""
filterIcons(search.value)

for (const icon of icons) {
  // To prevent focus from leaving the search box, manually handle mouse and
  // keyboard events.
  icon.addEventListener("mousedown", (e) => {
    e.preventDefault()
    copy(e)
  })

  icon.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      copy(e)
    }
  })
}

function copy(e) {
  const { name, codepoint } = e.currentTarget.dataset

  navigator.clipboard.writeText(String.fromCodePoint(codepoint))
  notificationText.innerText = name

  animate()
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

function filterIcons(query) {
  let count = 0

  for (const icon of icons) {
    const name = icon.dataset.name.toLowerCase()
    const matches = name.includes(query)

    icon.style.display = matches ? "" : "none"
    count += matches ? 1 : 0
  }

  emptyState.classList.toggle("hidden", !!count)
  emptyState.classList.toggle("flex", !count)
}

search.addEventListener("keyup", (e) => {
  const query = e.target.value.toLowerCase()
  filterIcons(query)

  // Save the current search query in the URL
  const url = query
    ? `?q=${encodeURIComponent(query)}`
    : window.location.pathname

  window.history.replaceState({}, "", url)
})

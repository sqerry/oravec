// Removes stray commas from menu list items
function removeMenuCommas() {
    $('.menu-level-3 li').each(function () {
        this.innerHTML = this.innerHTML.replace(/,/g, '')
    })
}

export function initHeader() {
    removeMenuCommas()
}

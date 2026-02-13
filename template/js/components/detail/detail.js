// Extracts all VZK- parameter values from detail parameters table and hides the rows
function extractVzorkovnikCodes() {
    const codes = []

    $('.detail-parameters tr').each(function () {
        const td = $(this).find('td')
        const text = td.text().trim()

        if (text.startsWith('VZK-')) {
            $(this).hide()
            const parts = text.split('-')
            const csCategory = parts[2] || null
            codes.push({ code: text, csCategory })
        }
    })

    return codes
}

// Fetches vzorkovnik page and parses image/title pairs from .text container
async function fetchVzorkovnikItems(code) {
    const response = await fetch(`/${code}`)
    const html = await response.text()

    const doc = new DOMParser().parseFromString(html, 'text/html')
    const textContainer = doc.querySelector('.text')

    if (!textContainer) return { items: [], heading: null }

    const heading = textContainer.querySelector('h2')?.textContent.trim() || null
    const items = []
    const children = Array.from(textContainer.children)

    for (let i = 0; i < children.length; i++) {
        const el = children[i]

        if (el.tagName === 'P') {
            const img = el.querySelector('img')
            const nextEl = children[i + 1]

            if (img && nextEl) {
                items.push({
                    src: img.src,
                    title: nextEl.textContent.trim(),
                })
            }
        }
    }

    return { items, heading }
}

// Builds gallery HTML for a single vzorkovnik section
function buildGallerySection(items, heading, index) {
    const galleryItems = items
        .map(
            ({ src, title }) => /* HTML */ `
                <div class="plus-gallery-item">
                    <a
                        href="${src}"
                        title="${title}"
                        data-gallery="lightbox[gallery-vzorkovnik-${index}]"
                        class="cboxElement">
                        <div class="plus-gallery-item-img">
                            <img src="${src}" alt="${title}" loading="lazy" />
                        </div>
                        <div class="plus-gallery-item-title">${title}</div>
                    </a>
                </div>
            `
        )
        .join('')

    const headingHtml = heading ? /* HTML */ `<h3 class="vzorkovnik-heading">${heading}</h3>` : ''

    return /* HTML */ `
        ${headingHtml}
        <div class="plus-gallery-wrap">${galleryItems}</div>
    `
}

// Renders vzorkovnik gallery tab with category headings before first occurrence
function renderVzorkovnikTab(galleries) {
    const tabList = $('#p-detail-tabs')
    const tabContentParent = $('#description').parent()

    const validGalleries = galleries.filter((g) => g.items.length > 0)
    if (!tabList.length || !tabContentParent.length || !validGalleries.length) return

    const seenCategories = new Set()
    const galleriesHtml = validGalleries
        .map((gallery, index) => {
            const categoryKey = gallery.csCategory
            const categoryTitle = vzkCsTitles[categoryKey]
            let html = ''

            if (categoryTitle && !seenCategories.has(categoryKey)) {
                seenCategories.add(categoryKey)
                html += /* HTML */ `<h2 class="vzorkovnik-category-heading">${categoryTitle}</h2>`
            }

            html += buildGallerySection(gallery.items, gallery.heading, index)
            return html
        })
        .join('')

    const tabHtml = /* HTML */ `
        <li class="shp-tab" data-testid="tabVzorkovnik">
            <a href="#vzorkovnik" class="shp-tab-link" role="tab" data-toggle="tab">Vzorkovnik</a>
        </li>
    `

    const contentHtml = /* HTML */ `
        <div id="vzorkovnik" class="tab-pane fade" role="tabpanel">
            <span class="detail-tab-item js-detail-tab-item" data-content="vzorkovnik">Vzorkovnik</span>
            <div class="detail-tab-content">${galleriesHtml}</div>
        </div>
    `

    tabList.append(tabHtml)
    tabContentParent.append(contentHtml)

    initVzorkovnikColorbox()
    // insertVzorkovnikLink()
    setupVzorkovnikLinkHandler()
}

// Initializes colorbox for dynamically added vzorkovnik gallery items
function initVzorkovnikColorbox() {
    $('#vzorkovnik .cboxElement').each(function () {
        const galleryGroup = $(this).data('gallery')
        $(this).colorbox({
            rel: galleryGroup,
            maxWidth: '95%',
            maxHeight: '95%',
        })
    })
}

// Inserts vzorkovnik link button after detail parameters grid
function insertVzorkovnikLink() {
    const parametersGrid = $('.p-info-grid .detail-parameters')
    if (!parametersGrid.length || $('.vzorkovnik-link').length) return

    const linkHtml = /* HTML */ `
        <a href="#" class="vzorkovnik-link btn btn-secondary">Pozrite si všetky vzorky</a>
    `
    parametersGrid.after(linkHtml)
}

// Scrolls to vzorkovnik tab and activates it
function scrollToVzorkovnikTab() {
    const vzorkovnikTab = $('[data-testid="tabVzorkovnik"] a')
    const vzorkovnikContent = $('#vzorkovnik')

    vzorkovnikTab.trigger('click')

    const scrollToVzorkovnik = () => {
        $('html, body').animate({ scrollTop: vzorkovnikContent.offset().top - 100 }, 300)
    }

    vzorkovnikContent.one('transitionend', scrollToVzorkovnik)
    setTimeout(scrollToVzorkovnik, 350)
}

// Handles click on vzorkovnik link - opens tab and scrolls to it
function setupVzorkovnikLinkHandler() {
    $(document)
        .off('click.vzorkovnikLink')
        .on('click.vzorkovnikLink', '.vzorkovnik-link', (e) => {
            e.preventDefault()
            scrollToVzorkovnikTab()
        })
}

// Binds click on image links pointing to #vzorkovnik to open and scroll to the tab
function setupVzorkovnikImageLinks() {
    $('a[href="#vzorkovnik"]')
        .has('img')
        .off('click.vzorkovnikImage')
        .on('click.vzorkovnikImage', (e) => {
            e.preventDefault()
            scrollToVzorkovnikTab()
        })
}

function changeDetailBtn() {
    const detailFlag = $('.p-image-wrapper .flag.flag-detail-btn')
    const addToCartButton = $('.p-info-wrapper .add-to-cart-button')

    if (!detailFlag.length) return

    const flagText = detailFlag.text()
    addToCartButton.text(flagText).addClass('detail-btn')
}

// Initializes vzorkovnik feature - detects codes, fetches data, renders gallery tab
async function initVzorkovnik() {
    const codeData = extractVzorkovnikCodes()
    if (!codeData.length) return

    const galleries = await Promise.all(
        codeData.map(async ({ code, csCategory }) => {
            const result = await fetchVzorkovnikItems(code)
            return { ...result, csCategory }
        })
    )
    renderVzorkovnikTab(galleries)

    $('.extended-description').hide()
}

// Initializes product detail page enhancements
export function initDetail() {
    initVzorkovnik()
    changeDetailBtn()
    setupVzorkovnikImageLinks()
}

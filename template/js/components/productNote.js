// Gets the current variant SKU from variant data using priceId
function getProductId() {
    try {
        const priceId = $('input[name="priceId"]').val()
        const variantData = shoptet.variantsSplit?.necessaryVariantData

        if (!priceId || !variantData) return null

        for (const key in variantData) {
            if (variantData[key].id === parseInt(priceId, 10)) {
                console.log('[ProductNote] getProductId:', variantData[key].code)
                return variantData[key].code
            }
        }
        return null
    } catch {
        return null
    }
}

// Retrieves saved product notes from localStorage
export function getNotes() {
    return JSON.parse(localStorage.getItem('productNotes')) || []
}

// Checks if all variant parameters are selected
function isVariantSelected() {
    const variantSelects = $('.hidden-split-parameter')
    if (!variantSelects.length) return true

    let allSelected = true
    variantSelects.each(function () {
        if (!$(this).val()) {
            allSelected = false
            return false
        }
    })
    return allSelected
}

// Checks if vzorkovnik is active on this product (has VZK- parameter or vzorkovnik tab)
function isVzorkovnikActive() {
    if ($('#vzorkovnik').length > 0) return true

    let hasVzk = false
    $('.extended-description .detail-parameters tr td').each(function () {
        if ($(this).text().trim().startsWith('VZK-')) {
            hasVzk = true
            return false
        }
    })
    console.log('[ProductNote] isVzorkovnikActive:', hasVzk)
    return hasVzk
}

// Validates note input - note is required only if vzorkovnik is active
function validateNote(noteValue) {
    if (!isVariantSelected()) {
        console.log('[ProductNote] Variant not selected')
        return false
    }

    if (isVzorkovnikActive() && !noteValue) {
        console.log('[ProductNote] Note required but empty (vzorkovnik active)')
        return false
    }

    return true
}

// Creates the note input HTML element
function createNoteInput(labelText, isRequired) {
    const spanClass = isRequired ? 'required-asterisk' : ''
    const requiredAttr = isRequired ? 'required' : ''
    const helperText = isRequired
        ? '<small class="product-note-helper">Tu napíšte názov vybranej poťahovej látky:</small>'
        : ''
    return /* HTML */ `
        <div class="form-group product-note">
            <label for="productNote">
                <span class="${spanClass}">${labelText}</span>
            </label>
            ${helperText}
            <textarea id="productNote" name="productNote" class="form-control" ${requiredAttr}></textarea>
        </div>
    `
}

// Appends note input to form if not already present
function handleNewNote(container) {
    const isRequired = isVzorkovnikActive()

    if (!$('.form-group.product-note').length) {
        container.append(createNoteInput('Vaše poznámky k tovaru', isRequired))
    } else {
        const noteGroup = $('.form-group.product-note')
        const labelSpan = noteGroup.find('label span')
        const textarea = $('#productNote')

        labelSpan.toggleClass('required-asterisk', isRequired)
        textarea.prop('required', isRequired)

        if (isRequired && !noteGroup.find('.product-note-helper').length) {
            noteGroup.find('label').after('<small class="product-note-helper">Tu napíšte názov vybranej poťahovej látky:</small>')
        } else if (!isRequired) {
            noteGroup.find('.product-note-helper').remove()
        }
    }
    $('.form-group.product-note').show()
}

// Sets up form submission and enter key handlers for note input
function setupEventListeners() {
    const productForm = $('#product-detail-form')

    productForm.off('submit.productNote').on('submit.productNote', (e) => {
        e.preventDefault()

        const productNoteInput = $('#productNote')
        const currentProductId = getProductId()
        const noteValue = productNoteInput.val().trim()
        const vzorkovnikActive = isVzorkovnikActive()

        console.log('[ProductNote] Form submit - ID:', currentProductId, '| Note:', noteValue, '| Vzorkovnik:', vzorkovnikActive)

        if (!validateNote(noteValue)) {
            console.log('[ProductNote] Validation failed')
            return
        }

        if (currentProductId && noteValue) {
            const productName = $('h1').first().text().trim() || ''
            const latestNotes = getNotes()
            updateLocalStorage(currentProductId, latestNotes, noteValue, productName)
            productForm.attr('data-note-id', currentProductId)
            productNoteInput.val('')
            console.log('[ProductNote] Note saved:', currentProductId, noteValue)
        }

        $('.add-to-cart-button').trigger('click.shoptet')
    })

    $('#productNote')
        .off('keypress.productNote')
        .on('keypress.productNote', (e) => {
            if (e.which === 13) {
                e.preventDefault()
                productForm.trigger('submit.productNote')
            }
        })
}

// Saves or removes note from localStorage for a specific product
function updateLocalStorage(productId, notes, noteValue, productName) {
    if (!productId) {
        console.error('[ProductNote] Invalid product ID')
        return
    }

    const filteredNotes = notes.filter((note) => note.id !== productId)

    if (noteValue) {
        filteredNotes.push({
            id: productId,
            note: noteValue,
            name: productName,
        })
    }

    localStorage.setItem('productNotes', JSON.stringify(filteredNotes))
    console.log('[ProductNote] localStorage updated:', filteredNotes)
}

// Removes notes for products no longer in cart
export function cleanupRemovedProductNotes() {
    try {
        const cartProductCodes = []
        $('.cart-table tr.removeable').each(function () {
            const sku = $(this).data('micro-sku')
            if (sku) cartProductCodes.push(sku)
        })

        if (!cartProductCodes.length) return

        const notes = getNotes()
        const remainingNotes = notes.filter((note) => cartProductCodes.includes(note.id))

        if (remainingNotes.length !== notes.length) {
            localStorage.setItem('productNotes', JSON.stringify(remainingNotes))
            console.log('[ProductNote] Cleaned up notes, remaining:', remainingNotes)
        }
    } catch (error) {
        console.error('[ProductNote] cleanupRemovedProductNotes error:', error)
    }
}

// Creates HTML for displaying a note in the cart
function createCartNoteDisplay(note) {
    return /* HTML */ `
        <div class="cart-note-display">
            <span class="note-text">${note}</span>
            <span
                class="show-tooltip question-tooltip"
                title="Poznámka platí pre všetky kusy tohto produktu"></span>
        </div>
    `
}

// Displays saved notes next to matching products in cart
function displayCartNotes() {
    const notes = getNotes()
    const cartRows = $('.cart-table tr.removeable')

    console.log('[ProductNote] displayCartNotes - Notes:', notes, '| Rows:', cartRows.length)

    cartRows.each(function () {
        const row = $(this)
        const productSku = row.data('micro-sku')
        const productNote = notes.find((note) => note.id === productSku)

        console.log('[ProductNote] Row SKU:', productSku, '| Match:', productNote)

        if (productNote && !row.find('.cart-note-display').length) {
            row.find('.p-name').append(createCartNoteDisplay(productNote.note))
            row.attr('data-note-id', productNote.id)
        }
    })
}

// Handles cart update events - refreshes notes display
function handleCartUpdate() {
    cleanupRemovedProductNotes()
    displayCartNotes()
}

// Initializes note input on product detail page
function initDetailNote() {
    const container = $('.detail-parameters-block')
    console.log('[ProductNote] initDetailNote - container found:', container.length)

    if (!container.length) return

    handleNewNote(container)
    setupEventListeners()
}

// Sets up listeners for detail page variant changes
function inDetail() {
    if (!$('.type-detail').length) return

    console.log('[ProductNote] inDetail - initializing')
    initDetailNote()

    $(document).on('ShoptetSplitVariantParameterChange', () => {
        console.log('[ProductNote] Variant changed')
        setTimeout(initDetailNote, 150)
    })
}

// Initializes note display on cart page
function inCart() {
    if (!$('.id--9').length) return

    console.log('[ProductNote] inCart - initializing')
    displayCartNotes()
    cleanupRemovedProductNotes()

    $(document).on('ShoptetDOMCartContentLoaded', () => {
        setTimeout(handleCartUpdate, 150)
    })

    $('.cart-table').on('change', '.amount input', () => {
        setTimeout(handleCartUpdate, 150)
    })
}

// Sets up global cart event listeners for cleanup
function setupGlobalCartListeners() {
    $(document).on('ShoptetCartUpdated ShoptetCartContentLoaded', () => {
        setTimeout(cleanupRemovedProductNotes, 150)
    })
}

// Appends product notes to general remark field before order submission
function addProductNotesToGeneralNote() {
    document.addEventListener('ShoptetSuccessfulValidation', (e) => {
        const notes = getNotes()

        if (notes.length > 0) {
            e.preventDefault()

            const remarkField = $('#remark')
            const currentRemark = remarkField.val() || ''

            const productNotes = notes.map((note) => `${note.id} / ${note.name}: ${note.note}`).join(' ||| ')

            const newRemark = [
                currentRemark && `Poznámka pre predajcu: ${currentRemark}`,
                productNotes && `Poznámky k produktu: ${productNotes}`,
            ]
                .filter(Boolean)
                .join(' ||| ')

            remarkField.val(newRemark)
            console.log('[ProductNote] Remark updated:', newRemark)

            $('#submit-order').click()
        }
    })
}

// Initializes cart step 3 (checkout) functionality
function inCheckout() {
    if (!$('.id--17').length) return

    console.log('[ProductNote] inCheckout - initializing')
    addProductNotesToGeneralNote()
}

// Main entry point - initializes product note functionality
export function initProductNote() {
    console.log('[ProductNote] initProductNote called')
    setupGlobalCartListeners()
    inDetail()
    inCart()
    inCheckout()
}

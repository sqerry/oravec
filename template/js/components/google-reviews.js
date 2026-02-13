const REVIEWS_API = 'https://oravec-google-reviews.nrobern.workers.dev/reviews'
const GOOGLE_MAPS_URL =
    'https://www.google.com/search?sa=X&sca_esv=15046669d36cafaf&hl=cs-CZ&gl=cz&sxsrf=ANbL-n5YAnD-3_MGjUdwBUbi8Q5zAlA56Q:1770981499737&q=ORAVEC+N%C3%81BYTOK+Recenze&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxI2NrS0NDI1MzYxNzAztTAwtzC32MDI-IpR3D_IMczVWcHvcKNTZIi_t0JQanJqXlXqIlZcMgDxUo0JTgAAAA&rldimm=3199256347065807878&tbm=lcl&ved=2ahUKEwiC_ceZrNaSAxWBQ_EDHaD0JEwQ9fQKegQIWBAG&cshid=1770981535431468&biw=2267&bih=1390&dpr=1#lkt=LocalPoiReviews'

// Fetches Google reviews from the Worker API and renders them in the footer
export function initGoogleReviews() {
    fetch(REVIEWS_API)
        .then((res) => res.json())
        .then((data) => {
            if (!data.reviews?.length) return
            renderReviews(data.reviews)
        })
        .catch((err) => console.error('Google Reviews fetch failed:', err))
}

function renderStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
}

// Calculates relative time in Slovak from an ISO date string
function getRelativeTime(dateString) {
    const now = new Date()
    const date = new Date(dateString)
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24))

    if (diffDays < 1) return 'dnes'
    if (diffDays < 7) return diffDays === 1 ? 'pred 1 dňom' : `pred ${diffDays} dňami`
    const diffWeeks = Math.floor(diffDays / 7)
    if (diffWeeks < 5) return diffWeeks === 1 ? 'pred 1 týždňom' : `pred ${diffWeeks} týždňami`
    const diffMonths = Math.floor(diffDays / 30)
    if (diffMonths < 12) return diffMonths === 1 ? 'pred 1 mesiacom' : `pred ${diffMonths} mesiacmi`
    const diffYears = Math.floor(diffDays / 365)
    return diffYears === 1 ? 'pred rokom' : `pred ${diffYears} rokmi`
}

function buildReviewCard(review) {
    const initial = review.author.charAt(0).toUpperCase()

    return /* HTML */ `
        <div class="swiper-slide">
            <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer" class="google-review">
                <div class="google-review__body">
                    <div class="google-review__header">
                        <img
                            src="${review.photo}"
                            alt="${review.author}"
                            class="google-review__avatar"
                            loading="lazy"
                            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
                            referrerpolicy="no-referrer" />
                        <span class="google-review__avatar-fallback" style="display:none">${initial}</span>
                        <div class="google-review__meta">
                            <span class="google-review__author">${review.author}</span>
                            <span class="google-review__stars">${renderStars(review.rating)}</span>
                        </div>
                    </div>
                    <p class="google-review__text">${review.text}</p>
                    <span class="google-review__time">${getRelativeTime(review.time)}</span>
                </div>
            </a>
        </div>
    `
}

// Builds the reviews section and prepends it to .footer-rows
function renderReviews(reviews) {
    const footerRows = $('.footer-rows')
    if (!footerRows.length) return

    const reviewCards = reviews.map(buildReviewCard).join('')
    const html = /* HTML */ `
        <div class="google-reviews footer-item">
            <div class="google-reviews__header">
                <div class="google-reviews__title">
                    <svg class="google-reviews__google-icon" viewBox="0 0 24 24" width="24" height="24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <h4>Google recenzie</h4>
                </div>
                <div class="google-reviews__nav">
                    <button class="google-reviews__prev" aria-label="Predchádzajúca recenzia">&#8249;</button>
                    <button class="google-reviews__next" aria-label="Nasledujúca recenzia">&#8250;</button>
                </div>
            </div>
            <div class="google-reviews__slider swiper">
                <div class="swiper-wrapper">${reviewCards}</div>
            </div>
        </div>
    `

    footerRows.prepend(html)

    $('.google-review').on('scroll', function () {
        const el = this
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 5
        $(el).toggleClass('is-scrolled-bottom', atBottom)
    })

    new Swiper('.google-reviews__slider', {
        slidesPerView: 1.3,
        spaceBetween: 12,
        navigation: {
            prevEl: '.google-reviews__prev',
            nextEl: '.google-reviews__next',
        },
        breakpoints: {
            992: {
                slidesPerView: 2.5,
            },
            1199: {
                slidesPerView: 3.3,
            },
        },
    })
}

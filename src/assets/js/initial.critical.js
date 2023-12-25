const mainSection = document.querySelector('#main')

const startAnimation = () => {
    mainSection?.classList.add('is-visible')
}

window.onload = () => {
    startAnimation()
}

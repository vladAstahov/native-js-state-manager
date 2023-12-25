const getAnimatedSection = (id) => {
    const section = document.querySelector(`#${id}`)

    return {
        classList: section?.classList,
        offset: section?.getBoundingClientRect().top - section?.clientHeight / 2,
        isShowed: section?.classList.contains('is-visible') ?? false
    }
}

const sections = [
    getAnimatedSection('benefits'),
    getAnimatedSection('tariff'),
    getAnimatedSection('promotion')
]

const onScroll = () => {
    const scrollOffset = window.scrollY

    sections.forEach(section => {
        if (scrollOffset > section.offset && !section.isShowed) {
            section.classList.add('is-visible')
        }
    })

    if (scrollOffset + window.innerHeight >= document.body.scrollHeight) {
        document.removeEventListener('scroll', onScroll)
    }
}

document.addEventListener('scroll', onScroll)
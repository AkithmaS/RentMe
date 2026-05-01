import { useLayoutEffect } from 'react'

const useRevealOnScroll = (deps = [], selector = '.reveal') => {
  useLayoutEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector))
    if (!('IntersectionObserver' in window) || elements.length === 0) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    elements.forEach((element) => {
      element.classList.remove('is-visible')
      element.classList.add('is-hidden')
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('is-hidden')
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, deps)
}

export default useRevealOnScroll

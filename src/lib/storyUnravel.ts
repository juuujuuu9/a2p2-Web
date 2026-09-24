import { useLayoutEffect, useState, type RefObject } from 'react'

const STORY_ROOT_MARGIN = '0px 0px -12% 0px'
const STORY_BOTTOM_INSET = 0.12

export function flowClass(on: boolean) {
  return on ? 'story-unravel' : 'story-pending'
}

/** Matches IntersectionObserver rootMargin bottom −12%. */
export function storyVisibleRatio(rect: DOMRect): number {
  const vh = window.innerHeight
  const edge = vh * (1 - STORY_BOTTOM_INSET)
  if (rect.bottom <= 0 || rect.top >= edge) return 0
  const visible = Math.min(rect.bottom, edge) - Math.max(rect.top, 0)
  return visible / Math.max(rect.height, 1)
}

export function isStoryInView(node: HTMLElement, minRatio = 0.25): boolean {
  return storyVisibleRatio(node.getBoundingClientRect()) >= minRatio
}

function revealVisibleFlows(root: HTMLElement): Record<string, boolean> {
  const found: Record<string, boolean> = {}
  for (const node of root.querySelectorAll<HTMLElement>('[data-flow]')) {
    const key = node.getAttribute('data-flow')
    if (key && isStoryInView(node)) found[key] = true
  }
  return found
}

export function useFlowReveal(rootRef: RefObject<HTMLElement | null>) {
  const [flows, setFlows] = useState<Record<string, boolean>>({})

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const nodes = [...root.querySelectorAll<HTMLElement>('[data-flow]')]

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFlows(
        Object.fromEntries(
          nodes.flatMap((node) => {
            const key = node.getAttribute('data-flow')
            return key ? [[key, true]] : []
          }),
        ),
      )
      return
    }

    const mergeVisible = () => {
      setFlows((prev) => ({ ...prev, ...revealVisibleFlows(root) }))
    }

    const io = new IntersectionObserver(
      (entries) => {
        setFlows((prev) => {
          const next = { ...prev }
          let changed = false
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const key = entry.target.getAttribute('data-flow')
            if (!key || next[key]) continue
            next[key] = true
            changed = true
            io.unobserve(entry.target)
          }
          return changed ? next : prev
        })
      },
      { threshold: 0.25, rootMargin: STORY_ROOT_MARGIN },
    )

    mergeVisible()
    for (const node of nodes) {
      const key = node.getAttribute('data-flow')
      if (!key || isStoryInView(node)) continue
      io.observe(node)
    }

    window.addEventListener('a2p2:intro-complete', mergeVisible)
    return () => {
      io.disconnect()
      window.removeEventListener('a2p2:intro-complete', mergeVisible)
    }
  }, [rootRef])

  return (flow: string) => !!flows[flow]
}

export function useStaggerReveal(
  listRef: RefObject<HTMLElement | null>,
  count: number,
  dataAttr: string,
  minRatio = 0.3,
) {
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    Array.from({ length: count }, () => false),
  )

  useLayoutEffect(() => {
    const root = listRef.current
    if (!root) return

    setRevealed(Array.from({ length: count }, () => false))

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(Array.from({ length: count }, () => true))
      return
    }

    const items = [...root.querySelectorAll<HTMLElement>(`[${dataAttr}]`)]
    const inView = new Set<number>()
    let nextIndex = 0
    let timer = 0

    const revealNext = () => {
      timer = 0
      if (nextIndex >= count || !inView.has(nextIndex)) return
      const index = nextIndex
      nextIndex += 1
      setRevealed((current) => {
        const next = current.slice()
        next[index] = true
        return next
      })
      if (inView.has(nextIndex)) {
        timer = window.setTimeout(revealNext, 450)
      }
    }

    const seedInView = () => {
      for (const item of items) {
        const index = Number(item.getAttribute(dataAttr))
        if (!Number.isNaN(index) && isStoryInView(item, minRatio)) {
          inView.add(index)
        }
      }
      if (!timer) revealNext()
    }

    seedInView()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(entry.target.getAttribute(dataAttr))
          if (Number.isNaN(index)) continue
          if (entry.isIntersecting) inView.add(index)
          else inView.delete(index)
        }
        if (!timer) revealNext()
      },
      { threshold: minRatio, rootMargin: STORY_ROOT_MARGIN },
    )

    for (const item of items) io.observe(item)

    const onIntroComplete = () => {
      seedInView()
    }
    window.addEventListener('a2p2:intro-complete', onIntroComplete)

    return () => {
      io.disconnect()
      window.clearTimeout(timer)
      window.removeEventListener('a2p2:intro-complete', onIntroComplete)
    }
  }, [count, dataAttr, listRef, minRatio])

  return revealed
}

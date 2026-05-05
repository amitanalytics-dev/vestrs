'use client'

import { useEffect, useRef, useMemo } from 'react'

/* ─── Config (mirrors the standalone demo's CONFIG object) ─ */
interface GuidedTextProps {
  text: string
  speed?: number          // ms per word
  highlightColor?: string // CSS color for the active-word glow
  autoplay?: boolean
  loop?: boolean
  delay?: number          // ms before autoplay starts (lets page animations settle)
  className?: string
}

export default function GuidedText({
  text,
  speed         = 260,
  highlightColor = 'rgba(16,185,129,0.10)',
  autoplay      = true,
  loop          = false,
  delay         = 1000,
  className     = '',
}: GuidedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  /* Split once; whitespace tokens are plain strings, word tokens become spans */
  const tokens = useMemo(() => text.split(/(\s+)/), [text])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    /* Gather all word spans */
    const wordEls = Array.from(
      container.querySelectorAll<HTMLSpanElement>('[data-w]'),
    )

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    /* If user prefers reduced motion, reveal everything immediately */
    if (prefersReduced) {
      wordEls.forEach(w => { w.dataset.state = 'read' })
      return
    }

    let cursor  = -1
    let timerId: ReturnType<typeof setTimeout> | null = null

    function activate(i: number) {
      if (i < 0 || i >= wordEls.length) return
      if (cursor >= 0) wordEls[cursor].dataset.state = 'read'
      cursor = i
      wordEls[cursor].dataset.state = 'active'
    }

    function tick() {
      timerId = setTimeout(() => {
        const next = cursor + 1
        if (next >= wordEls.length) {
          if (loop) {
            wordEls.forEach(w => { delete w.dataset.state })
            cursor = -1
            tick()
          }
          /* else: done — all words stay at their final "read" state */
        } else {
          activate(next)
          tick()
        }
      }, speed)
    }

    /* Click any word to jump to it and continue playing from there */
    wordEls.forEach((w, i) => {
      w.addEventListener('click', () => {
        if (timerId) clearTimeout(timerId)
        wordEls.forEach((el, j) => {
          if (j < i)    el.dataset.state = 'read'
          else          delete el.dataset.state
        })
        cursor = i - 1
        activate(i)
        tick()
      })
    })

    if (autoplay) {
      timerId = setTimeout(tick, delay)
    }

    return () => { if (timerId) clearTimeout(timerId) }
  }, [autoplay, delay, loop, speed])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ '--hl': highlightColor } as React.CSSProperties}
    >
      {tokens.map((tok, i) =>
        /^\s+$/.test(tok)
          ? tok
          : <span key={i} data-w className="guided-word">{tok}</span>,
      )}
    </div>
  )
}

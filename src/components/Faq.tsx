import { useId, useState } from 'react'
import { FAQ_HERO } from '../lib/media'
import type { FaqContent } from '../lib/parseContent'

export function Faq({ hero, heading, items, close }: FaqContent) {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()

  return (
    <>
      <div className="relative">
        <img
          src={FAQ_HERO.src}
          width={FAQ_HERO.width}
          height={FAQ_HERO.height}
          alt=""
          className="h-auto w-full"
          fetchPriority="high"
          decoding="sync"
        />
        {hero ? (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/20 px-6">
            <p className="font-sauce-regular text-center text-xl leading-snug whitespace-pre-line text-white sm:text-2xl">
              {hero}
            </p>
          </div>
        ) : null}
      </div>
      <section className="bg-bg">
        <div className="mx-auto max-w-7xl px-6 pt-14 sm:px-8 sm:pt-16 lg:px-12">
          <h1 className="font-sauce-bold pb-4 text-xl tracking-tight text-fg sm:text-2xl">
            {heading}
          </h1>
        </div>
        <hr className="border-0 border-t border-fg/20" />
        <ul className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {items.map((item, index) => {
            const expanded = open === index
            const panelId = `${baseId}-${index}`
            return (
              <li key={item.question} className="relative">
                <span
                  aria-hidden
                  className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-fg/20"
                />
                <h2 className="text-[18pt] leading-snug font-normal tracking-normal">
                  <button
                    type="button"
                    className="font-dm-regular w-full cursor-pointer py-4 text-left text-[18pt] leading-snug font-normal text-[#7199ab] hover:opacity-80 sm:py-5"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen((current) => (current === index ? null : index))}
                  >
                    {item.question}
                  </button>
                </h2>
                {item.html ? (
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        id={panelId}
                        role="region"
                        aria-hidden={expanded ? undefined : true}
                        className="prose-site font-dm-regular pb-5 text-[18pt] leading-[1.7] text-fg"
                        dangerouslySetInnerHTML={{ __html: item.html }}
                      />
                    </div>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
        {close ? (
          <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
            <div
              className="font-dm-regular max-w-5xl text-[18pt] leading-[1.7] text-fg italic [&_a]:underline [&_a]:underline-offset-2"
              dangerouslySetInnerHTML={{ __html: close }}
            />
          </div>
        ) : null}
      </section>
    </>
  )
}

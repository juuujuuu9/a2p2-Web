type FooterProps = {
  note: string
}

export function Footer({ note }: FooterProps) {
  return (
    <footer className="border-t border-fg/20 bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        {note ? <p className="font-sauce-regular text-sm text-muted">{note}</p> : null}
      </div>
    </footer>
  )
}

type FooterProps = {
  note: string
}

export function Footer({ note }: FooterProps) {
  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {note ? <p className="text-sm text-muted">{note}</p> : null}
      </div>
    </footer>
  )
}

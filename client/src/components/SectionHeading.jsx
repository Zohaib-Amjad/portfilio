import HoverLetters from './HoverLetters'

export default function SectionHeading({ label, title, description }) {
  return (
    <div className="mb-12 grid gap-5 lg:mb-16 lg:grid-cols-[1fr_.8fr] lg:items-end">
      <div>
        <p className="eyebrow mb-4">
          {label}
        </p>
        <h2 className="section-title">
          <HoverLetters text={title} />
        </h2>
      </div>
      {description && <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end">{description}</p>}
    </div>
  )
}

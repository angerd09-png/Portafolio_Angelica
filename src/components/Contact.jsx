const EMAIL = 'angerd09@gmail.com'
const PHONE = '+57 321 508 4499'

// Actualiza estos enlaces cuando tengas tus usuarios definidos.
const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/' },
  { label: 'Behance', href: 'https://behance.net/' },
  { label: 'Vimeo', href: 'https://vimeo.com/' },
]

export default function Contact() {
  return (
    <section id="contacto" className="section contact">
      <div className="container">
        <p className="section-eyebrow" style={{ color: 'var(--sand)' }}>Contacto</p>
        <a className="contact__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <div className="contact__socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
        <p className="contact__phone">{PHONE}</p>
      </div>
    </section>
  )
}

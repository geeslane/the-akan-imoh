import { LinkedInIcon, MailIcon, SubstackIcon, WhatsAppIcon, YouTubeIcon } from "@/components/ui/Icons";
import { nav, site, whatsappHref } from "@/lib/site";

export function Footer({ showStories = true }: { showStories?: boolean }) {
  const year = new Date().getFullYear();
  const whatsapp = whatsappHref("Hello Akan, I would like to talk about a feature.");
  const items = nav.filter((item) => showStories || item.id !== "stories");

  return (
    <footer className="footer">
      <div className="footer-row">
        <a className="logo" href="#top">
          Akan <em>Imoh</em>
        </a>

        <nav aria-label="Footer">
          {items.map((item) => (
            <a key={item.id} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="socials">
          <a href={`mailto:${site.email}`} aria-label="Email">
            <MailIcon />
          </a>
          <a href={site.youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube">
            <YouTubeIcon />
          </a>
          <a href={site.substackUrl} target="_blank" rel="noreferrer" aria-label="Substack">
            <SubstackIcon />
          </a>
          <a href={site.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          {whatsapp && (
            <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
          )}
        </div>
      </div>
      <p className="footer-emails">
        {site.emails.map((email) => (
          <a key={email} href={`mailto:${email}`}>
            {email}
          </a>
        ))}
      </p>
      <p className="copyright">© {year} Akan Imoh. All rights reserved.</p>

      {whatsapp && (
        <a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer">
          <WhatsAppIcon />
          WhatsApp
        </a>
      )}
    </footer>
  );
}

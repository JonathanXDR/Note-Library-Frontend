import { MarkGithubIcon } from '@primer/octicons-react'
import { Link } from '@primer/react'

interface Props {
  logo?: boolean
}

export default function Footer({ logo = true }: Props) {
  const links = [
    {
      href: 'https://docs.github.com/site-policy/github-terms/github-terms-of-service',
      label: 'Terms',
    },
    {
      href: 'https://docs.github.com/site-policy/privacy-policies/github-privacy-statement',
      label: 'Privacy',
    },
    { href: 'https://github.com/security', label: 'Security' }, // This is not present in the signup page
    { href: 'https://www.githubstatus.com/', label: 'Status' }, // This is not present in the signup page
    { href: 'https://docs.github.com/', label: 'Docs' },
    {
      href: 'https://support.github.com?tags=dotcom-footer', // This is named "Contact GitHub Support" in the signup page
      label: 'Contact',
    },
    {
      href: '#',
      label: 'Manage cookies',
      isButton: true,
    },
    {
      href: '#',
      label: 'Do not share my personal information',
      isButton: true,
    },
  ]

  return (
    <footer className="pt-8 pb-6 f6 color-fg-muted" role="contentinfo">
      <h2 className="sr-only">Footer</h2>

      <div className="flex justify-center items-center flex-col-reverse lg:flex-row flex-wrap lg:flex-nowrap">
        {logo && (
          <div className="flex items-center flex-shrink-0 mx-2">
            <Link
              aria-label="GitHub Homepage"
              className="text-fg-default! mr-2"
              href="https://github.com"
            >
              <MarkGithubIcon className="w-4 h-4" />
            </Link>
            <span>© 2025 GitHub,&nbsp;Inc.</span>
          </div>
        )}

        <nav aria-label="Footer">
          <h3 className="sr-only" id="sr-footer-heading">
            Footer navigation
          </h3>

          <ul
            className="list-style-none flex justify-center flex-wrap mb-2 lg:mb-0"
            aria-labelledby="sr-footer-heading"
          >
            {links.map((link, index) => (
              <li key={index} className="mx-2">
                <Link
                  as={link.isButton ? 'button' : 'a'}
                  type={link.isButton ? 'button' : undefined}
                  href={link.href}
                  muted
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

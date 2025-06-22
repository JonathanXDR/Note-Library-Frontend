import { MarkGithubIcon } from '@primer/octicons-react'
import { Link, PageHeader } from '@primer/react'

export default function Header() {
  return (
    <PageHeader
      role="banner"
      aria-label="Homepage"
      className="pt-5 pb-4 flex! justify-center items-center"
    >
      <PageHeader.TitleArea>
        <Link
          href="https://github.com/"
          aria-label="Homepage"
          className="text-fg-default!"
        >
          <MarkGithubIcon className="w-7 h-7" />
        </Link>
      </PageHeader.TitleArea>
    </PageHeader>
  )
}

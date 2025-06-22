import { Button, Heading } from '@primer/react'

export default function HomePage() {
  return (
    <div className="p-64 w-full h-full">
      <Heading as="h1">Welcome to the Home Page</Heading>
      <span>This is a simple Next.js application using TypeScript.</span>
      <Button variant="primary" size="large">
        Click Me
      </Button>
    </div>
  )
}

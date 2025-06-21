import { ErrorPage } from '../lib/components/ErrorPage'

export default function NotFound() {
  return <ErrorPage type="httpError" />
}

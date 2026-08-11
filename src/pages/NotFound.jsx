import Button from '../components/Button'

export default function NotFound() {
  return (
    <div className="page page--center">
      <div className="container not-found">
        <p className="not-found__code">404</p>
        <h1 className="not-found__title">This page took a wrong turn</h1>
        <p className="not-found__text">
          The route you asked for doesn&apos;t exist. Let&apos;s get you back somewhere useful.
        </p>
        <div className="not-found__actions">
          <Button to="/" icon="arrowRight">
            Back to home
          </Button>
          <Button to="/work" variant="ghost">
            View my work
          </Button>
        </div>
      </div>
    </div>
  )
}

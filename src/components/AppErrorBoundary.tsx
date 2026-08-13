import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { failed: boolean }

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State { return { failed: true } }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <main className="fatal-recovery">
        <section className="panel">
          <p className="panel-label">Studio Recovery</p>
          <h1>The look hit a snag.</h1>
          <p>Your locally saved prompts and collections have not been intentionally cleared. Reload the studio to recover the current view.</p>
          <button className="primary-button" onClick={() => window.location.reload()}>Reload Studio</button>
        </section>
      </main>
    )
  }
}

import React from 'react'

function ContactSupportLink(): React.JSX.Element {
  return (
    <p>
      Need help?{' '}
      <a href="mailto:support@codepilot.dev">Contact support</a>
      {' or '}
      <a
        href="https://docs.codepilot.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        read the docs
      </a>
      .
    </p>
  )
}

export { ContactSupportLink }
export default ContactSupportLink

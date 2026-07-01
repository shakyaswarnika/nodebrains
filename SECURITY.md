# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.0.x   | ✅        |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Email **shakyaswarnika@gmail.com** with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

You should receive a response within **72 hours**.

## Scope

This policy covers:

- NodeBrains WordPress theme PHP code
- Theme JavaScript assets
- Build tooling configuration
- GitHub Actions workflows

Out of scope:

- WordPress core vulnerabilities (report to [WordPress HackerOne](https://hackerone.com/wordpress))
- Third-party plugins
- Server/hosting configuration

## Best Practices for Contributors

- Never commit `.env` files, API keys, or credentials
- Escape all output (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_post`)
- Sanitize all user input
- Use nonces and capability checks for future admin features
- Keep dependencies updated via Dependabot (recommended)

## Disclosure

We follow coordinated disclosure. Credit will be given to reporters unless they prefer to remain anonymous.

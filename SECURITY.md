# Security policy

## Reporting a vulnerability

Please report security issues privately through GitHub: open the repository's **Security** tab and choose **Report a vulnerability**. Don't open a public issue or pull request for them.

Include what you found, the affected page or file, steps to reproduce, and the impact you expect. You'll get a reply within a few days. Please give us reasonable time to fix the issue before disclosing it.

## Scope

In scope: this website's code, including the account sign-in, OAuth consent and callback pages (`src/pages/account/`, `src/pages/oauth/`, `src/pages/auth/`), the build scripts and the deploy workflow.

Out of scope here:

- The Lumno extension. Report those through [lumno-extension's security reporting](https://github.com/kubai087/lumno-extension/security).
- Values that are public by design: the Supabase project URL and publishable key, the reCAPTCHA site key, the IndexNow key file, and store extension IDs. They ship to every browser.
- Issues in third-party services (GitHub Pages, Supabase, Google) unless this site's configuration causes them.

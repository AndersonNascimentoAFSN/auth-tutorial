import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXT_PUBLIC_APP_URL

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Please confirm your email address",
    text: `Please click on the following link to confirm your email address: ${confirmLink}`,
    html: `
      <p>Please click on the following link to confirm your email address: <a href="${confirmLink}">Confirm email address</a></p>
    `
  })
}


export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/auth/new-password?token=${token}`

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    text: `Please click on the following link to reset your password: ${resetLink}`,
    html: `
      <p>Please click on the following link to reset your password: <a href="${resetLink}">Reset your password</a></p>
    `
  })
}

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    text: `Please copy your 2FA code:`,
    html: `
      <p>Your 2FA code: <code>${token}</code></p>
    `
  })
}
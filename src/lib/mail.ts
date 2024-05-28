import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

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
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

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
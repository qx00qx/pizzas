import { Resend } from 'resend';
import { PayOrderTemplate } from '../components/shared/email-templates/pay-order';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactNode
) => {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
};

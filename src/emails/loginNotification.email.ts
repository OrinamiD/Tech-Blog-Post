import nodemailer from "nodemailer";
export const loginNotoficationEmail = async (email: string) => {
  const mailTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const emailDetails = {
    from: `${process.env.EMAIL}`,
    to: `${email}`,
    subject: "Login Notification",
    html: `

    <h2>Welcome to Wagger Demo System!</h2>

    <p>Your Account has been logged in by a user</p>
    <p>We're excited to have you join us.</p>

    <p>
       

    <hr>

    <p>Thank you,<br/>The Swagger Team</p>
`,
  };

  await mailTransport.sendMail(emailDetails);
};

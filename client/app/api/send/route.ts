import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(Request: Request) {
    const { email, username } = await Request.json();
    try {
        const { data, error } = await resend.emails.send({
            from: 'Mehdi Znayzen <onboarding@resend.dev>',
            to: ['mehdiznayzen@gmail.com'],
            subject: "⭐⭐⭐⭐⭐ From Imaginify application 😍🥳 !!",
            html: `
                <div style="font-family: 'Roboto', sans-serif;">
                    <h1 style="color: #3182ce; font-size: 30px;">Hi Mehdi 👋👋,</h1>
                    <h3>New user is added ❤️❤️ .</h3>
                    <h2>
                        User with username = ${username} and email = ${email} ✅✨ <br />
                        Is liking the application 🔥😊.
                    </h2>
                    <p>Until next time,</p>
                    <p>Imaginify team</p>
                </div>`,
        });

        if (error) {
            return Response.json({ error });
        }

        return Response.json({ data });
    } catch (error) {
        return Response.json({ error });
    }
}
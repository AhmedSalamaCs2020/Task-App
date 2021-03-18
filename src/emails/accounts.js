const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const sendWelcomeEmail = async (email, name) => {
    try {
        await sgMail.send({
            to: email,
            from: 'acmainshams@gmail.com',
            subject: 'Welcome to my site',
            text: `Welcome to the app, ${name}.`,
        });
    } catch (e) {
        console.log(e);
    }
};

const sendCancelationEmail = async (email, name) => {
    try {
        await sgMail.send({
            to: email,
            from: 'acmainshams@gmail.com',
            subject: 'Welcome to my site',
            text: `GOODBY yala ${name}.`,
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports={
    sendWelcomeEmail,
    sendCancelationEmail
}
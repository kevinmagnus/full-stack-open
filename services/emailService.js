import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    tls: {
rejectUnauthorized: false,
    },
     // or 'smtp.gmail.com'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD // Use App Password for Gmail
    }
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (email, resetUrl, firstName) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"Code Skill Africa" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {

    text-align: center;
    background-color: white;
}


.container {

    display: flex;
    flex-direction: column;
    
    justify-content: center;
    

}

.item {
    
justify-content: center;
    margin: 5%;
    background-color:  rgb(4, 67, 88);
    color: gray;
    border:  solid 3px rgb(73, 88, 102);
    border-radius: 8px 8px 8px 8px;
    padding: 10px;
    width:auto;
    flex-wrap: wrap;
    
   
    
}

.card {

    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px; 
    background-color: rgba(66, 53, 53, 0.733);
    padding: 10px;
    transition: all 0.3s ease-in-out;
    margin: 10px;
    text-align: center;
    width:auto;
    flex-wrap: wrap;



}


.card:hover {

    box-shadow: 0 0 20px rgba(0, 0, 0,0.2);
    transform: translateY(-5px);
}


.enrollment,#sign-up-button {

    border: solid 3px gray;
    border-radius: 10px 0px 10px 0px;
    font-size: 25px;
    font-weight: 50px;
    color: rgb(0, 255, 179);
    width: auto;
    background-color: black;
    
}

img {

    margin: auto;
    padding: 0px;
    border-radius: 20px 20px 20px 20px;
    background-color: rgb(1, 28, 37);
    height: auto;
    border: solid turquoise;
    width: 100%;


}

p {

    color: rgb(111, 197, 197);
    font-family: Georgia, 'Times New Roman', Times, serif;
}

#motto {

    margin: 10px;
    color: springgreen;
    font-style: oblique;
}


h1, h2 {

    color: rgb(152, 217, 219);
    margin: 3px;
}

a {


color: rgb(97, 255, 176);
    font-weight: 40px;
    text-decoration: none;
    font-size: 15px;
}



.price {

    font-size: 25px;
    font-weight: 40px;
    color: springgreen;
}


.course-title {

    color: turquoise;
    font-size: 25px;
    font-style: oblique;
    font-family:monospace;
    font-weight: bold;
}

.footer {

    background-color: rgb(82, 10, 150);
    width:auto;
    
}










header{
    width:98vw;
    position:relative;
    top: 0;
    z-index:10;
    justify-self: center;
    margin: 20px;
    border: solid 2px gray;
    border-radius: 30px 0px 30px 0px;

}



.navBar{
    background:var(--overlay);
    height: 3em;
    padding:0.75em;
    display:flex;
    justify-content:start;
    align-items:center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: inset var(--overlayBoxShadow);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur;
}
.navBar nav{
    padding:0 1em;
    display:flex;
    justify-content:end;
    align-items:center;
}


.navBar-item{
    text-decoration:none;
    font: bold 1.5em Comic;
    margin-left: 2em;
    display: flex;
    flex-direction: column;
}

.active{
    color: var(--primaryLight);
}

#home-nav {

    color: rgb(17, 112, 103);
}

.head {

    background-color: black;
    text-align: left;
    padding: 30px;
}

legend {
    color: orange;
}


label {

    color: rgb(39, 236, 154);
}

fieldset {

    border-radius: 20px 20px 20px 20px;
    margin: 30px;
    border: solid 5px gray;
    padding: 10px;
}



.submit-button {

    background-color: rgb(1, 126, 84);
    color: rgb(201, 199, 199);
    margin: 40px;
    padding: 30px;
}

input, textarea{

    color: rgb(22, 133, 122);
    border: solid 2px gray;
    border-radius: 5px 5px 5px 5px;
    margin:5px;
}


strong {

    font-size:xx-large;
    font-weight: bolder;
    font-style:oblique;
    font-family:cursive;
    color:rgb(65, 249, 255);
    margin: 40px;
}

#logo {

    height: auto;
    width: auto;
}

li {

    color: rgb(175, 139, 139);
    margin: 10px;

}



em {
    color: springgreen;
}









.icon {

    color: yellow;
}


#payment-success-message, #email-success-message{

    color: springgreen;
}


.list-item {

    color: springgreen;
}


.ambition , .introduction-paragraph {

    color: teal;
}


.entrepreneural-journey-heading {

    margin: 40px;
}

 .barrier-and-solution {

    color:#6cffd3e3;
}







.slider, .unemployment-data {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.slide, .slide-data {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s;
}

.slide.active, .slide-data.active1 {
  opacity: 1;
}

.slide {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#email-error-message {

    color: red;
}

.introduction-para {

    color: rgb(95, 214, 214);
}


.awarded {

    font-size: larger;
    font-weight: 300;
    font-style: italic;
    color: rgb(212, 182, 182);
 
}

.award-data{

    color: springgreen;
    font-size: 80px;
}

.offer {
    color: springgreen;
    font-size: 15px;
    
}


.sign-up-response {

    background-color: black;
    border-radius: 5px 5px 5px 5px;
}
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <h2>Password Reset Request</h2>
            <img src='
            <p>Hi ${firstName},</p>
            <p>You requested to reset your password. Click the button below to reset it:</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #007bff;">${resetUrl}</p>
            <p><strong>This link will expire in 1 hour.</strong></p>
            <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
            <div class="footer">
              <p>Best regards,<br>Code Skill Africa Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await transporter.sendMail(mailOptions);
};
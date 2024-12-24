import  {createTransport} from "nodemailer"

exports.sendMail=(id,email)=>{
	
	const transporter= createTransport({
		service:'gmail',
		auth:{

			user:process.env.MT_USER,
			pass:process.env.MT_PASS,
		}
	});

	const mailOptions={
		from:process.env.EMAIL,
		to:email,
		subject:"RESET PASSWORD",
		html:
		`<h1>RESET YOU PASSWORD</h1>
		<p>Click on the link to reset your password</p>
		<p>${process.env.FRONTEND_URL}/reset/${id}</p>
		<p>The link will expire in 120 seconds</p>
		<p>If you didnot request any password reset ,please ignore tyhis email</p>`
	}

		transporter.sendMail(mailOptions)

}
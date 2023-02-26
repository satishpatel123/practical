const userModel = require('../model/user')
const roleModel = require('../model/role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config()
const validator = require('../helpers/validate');

//Sign-up
const signup = async (req, res, next) => {
	
	try {
		const validationRule = {
			"email": "required|string|email",
			"name": "required|string",
			"lastname": "required|string",
			"password": "required|string|min:8",
			"role": "required"
		};
		await validator(req.body, validationRule, {}, async(err, status) => { 
			if (!status) {
				res.status(400)
					.send({
						success: false,
						message: 'Validation failed',
						data: err
					});
			} else {
				const { name, email, password, role, lastname } = req.body;
				if(!req.body.password && !req.body.name && !req.body.email) {
					return res.status(400).json({
						message: "Please Enter name, email and password",
						status_code: 400,
					})
				}
				const roleName = await roleModel.find({
					$and: [
						{ id: role },
						{ status: true }
					]
				});

				if(roleName.length == 0) {
					return res.status(400).json({
						message: "Role is not found",
						status: 400,
					});
				}
				
				const oldUser = await userModel.findOne({ email });
				const encryptedPassword = await bcrypt.hash(password, 10);
				if(oldUser) {
					return res.status(400).json({
						message: "Email is allready exist",
						status: 400,
					});
				}

				const user = await userModel.create({
					name,
					lastname,
					email: email.toLowerCase(),
					password: encryptedPassword,
					role
				});

				const token = jwt.sign(
					{ user_id: user._id, email },
					process.env.TOKEN_KEY,
					{
					expiresIn: "10h",
					}
				);
				return res.status(201).json({
					data: user,
					token:token
				});
			}
		}).catch( err => {
			return res.status(500).json({
                error: err,
                status: 500
            });
		})
	} catch(err) {
		return res.status(400).json(err);
	}
};
const login = async (req, res, next) => {
	try  {
		const validationRule = {
			"email": "required|string|email",
			"password": "required|string|min:8",
		};
		await validator(req.body, validationRule, {}, async(err, status) => { 
			const { email, password } = req.body;
			if (!email && !password) {
				res.status(400).send("Please enter email and password");
			}
			const user = await userModel.findOne({ email });
			if (user && (await bcrypt.compare(password, user.password))) {
				const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "10h",
				}
				);
				return res.status(200).json({
					data : user,
					token: token,
					message: "User has been login successfully "
				});
			}
			return res.status(400).send({
				message: "Invalid email and Password",
				status: false
			});
		}).catch( err => {
			return res.status(500).json({
                error: err,
                status: 500
            });
		})
		
	} catch(err) {
		return res.status(400).json(err);
	}
};
module.exports = { signup, login };
import * as emailValidator from 'email-validator'
import * as md5 from 'md5'
import * as jwt from 'jsonwebtoken'
import { resp } from '.'

export function login(app, usersController): void {
    app.route('/auth/login')
        .post(async (req, res) => {
            let { email, password } = req.body

            let neededAccount = await usersController.getUsers({email: email, password: md5(password)})
            if (neededAccount[0]) {
                let token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                                data: neededAccount[0]._id
                            }, process.env.TOKEN_SECRET)
                resp(res, 1, token)
            }
            else {
                resp(res, 0, 'Login failed')
            }
        })
}

export function register(app, usersController): void {
    app.route('/auth/reg')
        .post(async (req, res) => {
            let errors: string[] = []
            let { email, password } = req.body  

            if (!emailValidator.validate(email)) {
                errors.push('Enter a valid email address')
            }

            let accountWithSuchEmail = await usersController.getUsers({email: email, email_confirmed: true})
            if (accountWithSuchEmail[0]){
                errors.push('There is already an account with such email address!')
            }

            if (password.length < 6 || password.length > 25) {
                errors.push('Your password length should not be greater then 25 or smaller than 6!')
            }

            if (errors[0]) resp(res, 0, errors)
            else resp(res, 1, await usersController.addNewUser(req.body))

        })
}
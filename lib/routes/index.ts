import { UsersController } from '../controllers/users'
import { login, register } from './auth'

export function resp(res, status, msg) {
    if (status) res.status(200).send({message: msg})
    else res.status(401).send({error: msg})
}

export class Routes {       

    public usersController: UsersController = new UsersController()

    public routes(app): void {

        // AUTH ROUTES
        login(app, this.usersController)
        register(app, this.usersController)

        app.route('/get_all_users')
            .get(async (req, res) => {
                resp(res, 1, await this.usersController.getUsers({}))
            })

    }
} 
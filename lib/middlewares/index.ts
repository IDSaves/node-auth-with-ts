import { Request, Response, NextFunction } from 'express'

export class Middlewares {
    public middlewares(app): void {

        // AUTH MIDDLEWARE
        app.use('/auth/', (req: Request, res: Response, next: NextFunction) => {
            if (req.body.email && req.body.password) next()
            else res.status(401).send({'error': 'Provide an authorization data!'})
        })
        
    }
}
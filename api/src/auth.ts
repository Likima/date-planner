import express from 'express'
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
// const user = require('./models/dummyUser');

interface CustomRequest extends Request {
    token?: string
}

// Temporary user data for testing
const user = {
    username: "Brandon",
    password: "1234"
};

export default function auth(app: express.Application) {
    const checkToken = (req: CustomRequest, res: Response, next: NextFunction) => {
        const header = req.headers['authorization'];
        if (typeof header !== 'undefined') {
            const bearer = header.split(' ');
            const token = bearer[1];
            req.token = token;
            next();
        } else {
            res.sendStatus(403)
        }
    }

    app.post('/user/login', async (req: Request, res: Response) => {
        try {
            // const { body } = req;
            console.log(req.body);
            const username = req.body.username;
            const password = req.body.password;

            console.log('Login attempt:', { username, password });

            if (!username || !password) {
                return res.status(400).json({ error: 'Missing credentials' });
            }

            // TODO : Change 'privatekey' to a proper verification method // 
            if (username === user.username && password === user.password) {
                const token = jwt.sign({ user }, 'privatekey', { expiresIn: '1h' });
                return res.json({ token });
            }

            return res.status(401).json({ error: 'Invalid credentials' });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.get('/user/data', checkToken, (req: CustomRequest, res: Response) => {
        jwt.verify(req.token, 'privatekey', (err: Error, authorizedData: any) => {
            if (err) {
                console.log('ERROR: Could not connect to the protected route');
                res.sendStatus(403);
            } else {
                res.json({
                    message: 'Successful log in',
                    authorizedData
                });
                console.log('SUCCESS: Connected to protected route');
            }
        })
    });

}
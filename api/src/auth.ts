import express from 'express'
import { Request, Response, NextFunction } from 'express';
import { createClient, GoTrueClient } from '@supabase/supabase-js'
import { Database } from 'bun:sqlite';
import { RequestHeader } from '@reflet/http';

const jwt = require('jsonwebtoken');

interface CustomRequest extends Request {
    token?: string
}

const user = {
    username: "Brandon",
    password: "1234"
};

export default function auth(app: express.Application) {
    const spb_url = process.env.SUPABASE_URL || '';
    const spb_key = process.env.SUPABASE_ANON_KEY || '';

    var isLoggedIn = false;

    if (spb_url == '' || spb_key == '') {
        console.log("Supabase Key or URL not provided!");
        console.log(spb_url);
        console.log(spb_key);
    }

    const supabase = createClient<Database>(spb_url, spb_key);

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

    app.post('/user/signup', async (req: Request, res: Response) => {
        const username = req.body.username;
        const password = req.body.password;

        console.log(username);
        console.log(password);
        console.log("User attempt to sign up")
        try {
            const { data, error } = await supabase.auth
                .signUp({
                    email: req.body.email,
                    password: req.body.password,
                    options: {
                        data: {
                            username: req.body.username,
                        }
                    }
                })

            if (error) {
                console.error('Signup error:', error);
                return res.status(400).json({ error: error.message });
            }

            if (data) {
                console.log('Signup successful:', data);
                return res.status(201).json({
                    message: 'User created successfully',
                    user: data.user
                });
            }
        } catch (error) {
            console.error('Server error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    })

    app.post('/user/login', async (req: Request, res: Response) => {
        try {
            const email = req.body.email;
            const password = req.body.password;

            console.log({ email, password })

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if (error) {
                console.error('Login error:', error);
                return res.status(401).json({ error: error.message });
            }

            if (data.user) {
                console.log("login success!")
                isLoggedIn = true;
                return res.status(200).json({
                    message: 'Login successful',
                    user: data.user
                });
            }

            console.log('Login attempt:', { email, password });

            // if (!username || !password) {
            //     return res.status(400).json({ error: 'Missing credentials' });
            // }

            // // TODO : Change 'privatekey' to a proper verification method // 
            // if (username === user.username && password === user.password) {
            //     const token = jwt.sign({ user }, 'privatekey', { expiresIn: '1h' });
            //     return res.json({ token });
            // }

            // return res.status(401).json({ error: 'Invalid credentials' });
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

    app.get('/user/loggedin', async (req: Request, res: Response) => {
        console.log("Checking if logged in now...")
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user);
        if (!user) {
            res.json({
                loggedIn: false,
                username: null
            })
        }
        else res.json({
            loggedIn: isLoggedIn,
            username: user.user_metadata
        })
    })
}
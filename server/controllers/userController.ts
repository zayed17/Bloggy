import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "justforfunn"

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Signup failed', error });
    }
};



export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('userToken', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 3600000,
        }); res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUser = async (req: any, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const logout = (req: Request, res: Response) => {
    try {
        res.clearCookie("userToken", {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 0,
        });

        res.status(200).json({ message: "Successfully logged out" });
    } catch (error: any) {
        console.error("Logout error:", error.message);
        res.status(500).json({ message: "Failed to logout", error: error.message });
    }
};
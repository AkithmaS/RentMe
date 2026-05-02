import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;
    if (!token) {
        return res.json({ success: false, message: 'Not authorised' })
    }
    try {
        const userId = jwt.verify(token, process.env.JWT_SECRET);
        if (!userId) {
            return res.json({ success: false, message: 'Not authorised' })
        }
        req.user = await User.findById(userId).select('-password')
        next();
    } catch (error) {
        
        res.json({ success: false, message: 'Not authorised' })
    }
}
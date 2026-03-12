const jwt = require('jsonwebtoken')
const user = require('../models/usermodel')

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log('Middleware started. Auth header:', authorization);

    if (!authorization) {
        return res.status(401).json({ error: "Authentication token required" });
    }

    const token = authorization.split(' ')[1];
    
    try {
        // Log the secret to verify it's loaded
        console.log('Secret key exists:', !!process.env.SECRET);
        
        const { _id } = jwt.verify(token, process.env.SECRET);
        console.log('Token verified, ID:', _id);

        req.user = await user.findOne({ _id }).select('_id');
        console.log('User found in DB:', req.user);
        
        if (!req.user) throw new Error('User not found');
        
        next();
    } catch (error) {
        console.log('Middleware Error:', error.message);
        res.status(401).json({ error: 'Request is not authorized' });
    }
}
module.exports= requireAuth
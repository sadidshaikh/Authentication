import { join } from 'path';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';

class UserController {

    static home = (req, res) => {
        res.render(join(process.cwd(), './views/index.ejs'));
    }
    
    static registration = (req, res) => {
        res.render(join(process.cwd(), './views/registration.ejs'));
    } 

    static createUserDoc = async (req, res) => {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        try{
            const { name, email } = req.body;
            // Creating New Document Using Model
            const doc = new UserModel({ name, email, password:hashPassword });
            // Saving Document
            await doc.save();
            res.redirect('/login');
        }catch(err){
            res.send(err);
        }
    }

    static verifyUser = async (req, res) => {
        try{
            const { email, password } = req.body;
            const userExists = await UserModel.findOne({email});
            if(userExists != null){
                const isMatch = await bcrypt.compare(password, userExists.password);
                if(isMatch){
                    res.send(`<h1>Welcome back ${userExists.name}</h3>`);
                }
                else{
                    res.send(`<h3>Wrong Password</h3>`)
                }
            }
            else{
                res.send(`<h3>Wrong Email</h3>`);
            }
        }catch(err){
            console.log(err);
        }
    }

    static login = (req, res) => {
        res.render(join(process.cwd(), './views/login.ejs'));
    } 
}

export default UserController;
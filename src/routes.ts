import {Router} from 'express';
import connection from './database/connection';

const routes = Router();

routes.get('/', async (req, res) => {
    
    try{
        await connection.authenticate();
        console.log('Connection Ok');
    }catch(error){
        console.log('Unable to Connect');
        console.log(error);
    }
    
    res.send('Hello World');
});

export default routes;
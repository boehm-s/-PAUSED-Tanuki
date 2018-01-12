import express		from 'express';
import usersMiddlewares from './../middlewares/users';

const usersRoutes = express.Router();

usersRoutes.route('/')
    .get(
	usersMiddlewares.getAll
    )
    .post(
	usersMiddlewares.create
    );

usersRoutes.route('/:id')
    .get(
	usersMiddlewares.getById
    )
    .put(
	usersMiddlewares.updateById
    )
    .delete(
	usersMiddlewares.deleteById
    );

export {usersRoutes};
export default usersRoutes;

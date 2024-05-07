import express from "express";

import {
    changePassword,
    deleteUser,
    getAllUsers, getOneUser,
    login, setFullName,
    signUp, updateProfile, updateUser,
} from "../controllers/userController.js";
import {protect, restrictTo} from "../controllers/authController.js";
import {signupRestrictToParams, userRoles} from "../constants.js";

export const userRouter = express.Router()

userRouter.post('/login', login)

const restricts = signupRestrictToParams()
userRouter.post('/signup',
    protect,
    restrictTo(...restricts),
    setFullName,
    signUp,
    getAllUsers
)

userRouter.use(protect)
restrictTo(userRoles.admin)

userRouter.get('/',getAllUsers)
userRouter.patch(
    '/profile',
    setFullName,
    updateProfile,
    changePassword,
)

userRouter.route('/:id')
    .delete(deleteUser,getAllUsers)
    .get(getOneUser)
    .patch(setFullName,updateUser,changePassword,getAllUsers)

import Joi from "joi";

export interface UserRegisterRequestBody {
	email: string;
	password: string;
}

export interface UserRegisterResponseBody {
    authToken: string;
}

export const passwordRegex = new RegExp(
	"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})"
);

export const userRegisterSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().pattern(passwordRegex).required(),
});


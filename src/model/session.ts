import { IsString } from 'class-validator';

export class LoginRequest {
    @IsString()
    readonly username: string;

    @IsString()
	readonly password: string;
}
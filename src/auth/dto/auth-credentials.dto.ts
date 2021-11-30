import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4, { message: 'El usuario es muy chico' })
    @MaxLength(8)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    // @Matches(regexpression aca)
    password: string;
}
import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "joao@surf.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "senha123", minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "João da Silva" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Surfista desde 2015", required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: "Florianópolis, SC", required: false })
  @IsOptional()
  @IsString()
  location?: string;
}

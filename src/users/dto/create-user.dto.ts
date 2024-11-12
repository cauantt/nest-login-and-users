export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: number;  // Definindo o papel do usuário (admin, usuário, etc.)
  }
  
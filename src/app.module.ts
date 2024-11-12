import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,  // Certifique-se de que a porta esteja correta
      username: 'root',  // Seu usuário do banco de dados
      password: 'root',  // Sua senha do banco de dados
      database: 'agendamento',  // Nome do seu banco de dados
      entities: [User],  // As entidades que você irá usar no seu projeto
      synchronize: true,  // Cuidado ao usar em produção, pois pode alterar o esquema do banco
    }),
    TypeOrmModule.forFeature([User]),
    UsersModule,AuthModule  // Adiciona a entidade User ao módulo
  ],
})
export class AppModule {}

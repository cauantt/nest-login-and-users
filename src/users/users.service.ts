import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; 
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';  // Import bcrypt to hash the password

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private repository: Repository<User>,
  ) {}

  async create(body: CreateUserDto) {
    try {
      // Check if user already exists
      const exists = await this.repository.findOneBy({ email: body.email });
      if (exists) throw new ConflictException('O usuário já existe!');

      // Hash the password
      const hashedPassword = await bcrypt.hash(body.password, 10);

      // Create user and save to DB
      const user = this.repository.create({ ...body, password: hashedPassword });
      return await this.repository.save(user);

    } catch (error) {
      throw error;  // Rethrow the error so it's properly handled
    }
  }

  async findAll() {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new Error('Error fetching users');
    }
  }

  async findOne2(email: string) {
    return await this.repository.findOneBy({ email });
  }


  async findOne(userId: number) {
    const user = await this.repository.findOneBy({ userId });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOneBy({ userId });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    // Update user and return
    await this.repository.update(userId, updateUserDto);
    return await this.repository.findOneBy({ userId });
  }

  async remove(userId: number) {
    const user = await this.repository.findOneBy({ userId });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    await this.repository.delete(userId);
    return 'Usuário removido com sucesso';
  }
}

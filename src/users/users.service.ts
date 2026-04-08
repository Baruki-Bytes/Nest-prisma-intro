import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
    constructor( private readonly databaseService: DatabaseService) {}

    async findOne(id: number){
        try{
            const user = await this.databaseService.user.findUnique({
                where: { id }, 
                select: {
                    id: true,
                    email: true,
                    name: true,
                    tasks: true
                }
            })

            if(user) return user;
            throw new HttpException("user not found", HttpStatus.BAD_REQUEST)
        }catch(error){
            throw new HttpException("Error to find user", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async create(createUserDto: CreateUserDto){
        try{
            const newUser = await this.databaseService.user.create({
                data: {
                    name: createUserDto.name,
                    email: createUserDto.email,
                    password: createUserDto.password
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                }
            })
            return newUser
        }catch(error){
            throw new HttpException("falou ao criar user", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto){
        try{
            const findUser = await this.databaseService.user.findUnique({
                where: { id }
            })

            if(!findUser) throw new HttpException("user not found", HttpStatus.BAD_REQUEST)

            const updatedUser = await this.databaseService.user.update({
                where: { id },
                data: {
                    name: updateUserDto.name ? updateUserDto.name : findUser.name,
                    password: updateUserDto.password ? updateUserDto.password : findUser.password,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                }
            })
            return updatedUser
        }catch(error){
            throw new HttpException("Error to update user", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(id: number){
        try{
            const findUser = await this.databaseService.user.findUnique({
                where: { id }
            })

            if(!findUser) {
                throw new HttpException("user not found", HttpStatus.BAD_REQUEST)
            }

            await this.databaseService.user.delete({
                where: { id }
            })

            return { message: "user deleted successfully" }
        
        }catch(error){
            throw new HttpException("Error to delete user", HttpStatus.INTERNAL_SERVER_ERROR)
        }  
    }  
}

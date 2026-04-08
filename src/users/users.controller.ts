import { Controller, Param, Get, Body, Put, Delete, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';



@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.UsersService.findOne(id)
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.UsersService.create(createUserDto)
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
        return this.UsersService.update(id, updateUserDto)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.UsersService.delete(id)
    }

}

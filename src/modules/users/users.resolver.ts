import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './models/user';
import { UsersService } from './users.service';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import CurrentUser from 'src/decorators/current-user.decorator';

import CreateUserDTO from './dto/create-user.dto';
import UpdateUserDTO from './dto/update-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  public createUser(@Args('payload') payload: CreateUserDTO): Promise<User> {
    return this.usersService.create(payload);
  }

  @Query(() => User)
  async getAllusers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  public updateUser(@Args('payload') payload: UpdateUserDTO): Promise<boolean> {
    return this.usersService.update(payload.userId, payload);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return this.usersService.delete(id);
  }
}

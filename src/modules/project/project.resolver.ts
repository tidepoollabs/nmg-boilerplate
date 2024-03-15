import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@common/guards/auth.guard';
import { CurrentUser } from '@common/decorators/current-user';
import { User } from '@modules/auth/entities/user.entity';

@Resolver(() => Project)
@UseGuards(GqlAuthGuard)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project)
  createProject(
    @Args('data') createProjectInput: CreateProjectInput,
    @CurrentUser() user: User,
  ) {
    return this.projectService.create(createProjectInput, user);
  }

  @Query(() => [Project], { name: 'myPorjects' })
  myProjects(@CurrentUser() user: User) {
    return this.projectService.findMyProjects(user);
  }
}

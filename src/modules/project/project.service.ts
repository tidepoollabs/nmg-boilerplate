import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Project } from './entities/project.entity';
import { InjectRepository, logger } from '@mikro-orm/nestjs';
import { User } from '@modules/auth/entities/user.entity';
import { TestProviderService } from '@providers/test-provider/test-provider.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>,
    private readonly em: EntityManager,
    private readonly testProviderService: TestProviderService,
  ) {}

  async create(createProjectInput: CreateProjectInput, user: User) {
    const existingProject = await this.projectRepository.findOne({
      name: {
        $like: createProjectInput.name,
      },
      owner: user,
    });

    if (existingProject) {
      throw new BadGatewayException(
        `Project with name <${createProjectInput.name}> already exists.`,
      );
    }
    const project = this.projectRepository.create({
      name: createProjectInput.name,
      description: createProjectInput.description,
      website: createProjectInput.website,
      owner: user,
    });
    try {
      await this.em.flush();
    } catch (e) {
      logger.error(e);
      throw new BadGatewayException(e);
    }
    return wrap(project).toObject();
  }

  async findMyProjects(user: User) {
    // example of using third-party service
    logger.log(this.testProviderService.test());
    const projects = await this.projectRepository.find({ owner: user });
    return projects.map((project) => wrap(project).toObject());
  }
}

import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Project } from './entities/project.entity';
import { TestProviderModule } from '@providers/test-provider/test-provider.module';
import { TestProviderService } from '@providers/test-provider/test-provider.service';

@Module({
  imports: [MikroOrmModule.forFeature([Project]), TestProviderModule],
  providers: [ProjectResolver, ProjectService, TestProviderService],
  exports: [ProjectService, MikroOrmModule.forFeature([Project])],
})
export class ProjectModule {}

# NestJS MikroORM and GraphQL Boilerplate

## Overview

A straightforward and scalable boilerplate for backend projects using NestJS, MikroORM, and GraphQL. Our project structure, honed from our team's experiences, supports efficient and scalable development.

## Requirements

Ensure you have the following prerequisites installed on your development environment:

- **Node.js**: v20.11.1 or higher ([Download Link](https://nodejs.org/))
- **pnpm**: 8.15.4 or higher ([Installation Guide](https://pnpm.io/installation))
- **PostgreSQL**: Version 12 or higher ([Download Page](https://www.postgresql.org/download/))
- **NestJS CLI**: 10.3.2 ([Installation Guide](https://docs.nestjs.com/cli/overview))

## Quick Start

1. Clone the repository to your local machine.
2. Navigate into the cloned directory and install dependencies with `pnpm install`.
3. Copy `.env.example` to `.env.development` and update it with your database credentials and other environment-specific variables.
4. Run the application in development mode with `pnpm start:dev`.

## Structure

The project is organized under the `src` directory to optimize development and scalability:

- **configs/**: Contains all configuration settings.
- **interceptors/**: NestJS interceptors for enhancing or transforming the response ([NestJS Interceptors](https://docs.nestjs.com/interceptors)).
- **modules/**: The core of the application, including services and modules.
- **common/**: Shared types, functions, and utilities.
- **database/**: Database configurations, migration scripts, and seeds.
- **providers/**: Integrations with third-party services (see example in project).


## Working with Database Migrations and Seeders

Our boilerplate simplifies managing your database through migrations and seeders, allowing you to easily set up, modify, and seed your database.

### Seeders

To populate your database with initial data, use the seeders located at `/src/database/seeders`. To execute the seeders, run the following command:

```bash
pnpm db:migration:seed
```

### Creating Migrations
When you need to create a new database schema migration, first ensure your module and entity are properly defined. Then, execute the following command to generate a new migration file:

```bash
pnpm db:migration:create
```

### Applying Migrations

To apply all pending migrations, bringing your database schema up to date, run:

```bash
pnpm db:migration:up
```

### Rolling Back Migrations

To roll back the most recent migration, run:

```bash
pnpm db:migration:down --to [your migration number]
```

## Useful commands

- **pnpm build**: Compiles the application into the `dist` directory (production).
- **pnpm start:prod**: Starts the application in production mode.
- **pnpm test**: Runs the test suite (will be implemented soon).
- **pnpm lint**: Lints the codebase using ESLint.
- **pnpm format**: Formats the codebase using Prettier.

## Useful links and resources

- **NestJS Documentation**: [https://docs.nestjs.com/](https://docs.nestjs.com/)
- **NestJs mikro-orm Documentation**: [https://docs.nestjs.com/recipes/mikroorm](https://docs.nestjs.com/recipes/mikroorm)
- **MikroORM Documentation**: [https://mikro-orm.io/docs/](https://mikro-orm.io/docs/)
- **GraphQL Documentation**: [https://graphql.org/learn/](https://graphql.org/learn/)
- **NestJs GraphQL Documentation**: [https://docs.nestjs.com/graphql/quick-start](https://docs.nestjs.com/graphql/quick-start)


## Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, please open an issue or submit a pull request.

## Contributors
@hayksaryan (All mikro-orm questions and issues should be directed to him :D)

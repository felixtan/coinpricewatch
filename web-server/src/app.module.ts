import path from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaClient } from '@prisma/client';
import { TypeGraphQLModule } from 'typegraphql-nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserCrudResolver } from '@generated/type-graphql';

interface Context {
  prisma: PrismaClient;
}

@Module({
  imports: [
    // TypeGraphQLModule.forRoot<ApolloDriverConfig>({
    TypeGraphQLModule.forRoot({
      driver: ApolloDriver,
      path: '/',
      emitSchemaFile: path.resolve(__dirname, './generated-schema.graphql'),
      validate: false,
      context: (): Context => ({ prisma: new PrismaClient() }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UserCrudResolver],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FreezerModule } from './freezer/freezer.module';
import { BoardModule } from './board/board.module';
import { FoodModule } from './food/food.module';
import { InfoModule } from './info/info.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from "./database.module";

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    FreezerModule,
    BoardModule,
    FoodModule,
    InfoModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

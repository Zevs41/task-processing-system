import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { BackendException } from 'core/exception/backend.exception';
import { EErrorCode } from 'core/exception/enums/error-code.enum';
import { IConfig } from 'core/config/config.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService<IConfig>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, accessKey] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer') {
      throw new BackendException(EErrorCode.Unauthorized);
    }

    const secretKey = this.configService.getOrThrow<string>('secretKey');

    return accessKey === secretKey;
  }
}

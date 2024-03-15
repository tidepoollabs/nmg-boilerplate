import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class TestProviderService {
  constructor(private configs: ConfigService) {}
  test() {
    // any logic
    return 'test';
  }
}

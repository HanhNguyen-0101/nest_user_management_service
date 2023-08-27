import { HttpException } from '@nestjs/common';

export class HttpExceptionCustom {
  constructor(
    public readonly msg: string,
    public readonly status: number,
  ) {}

  toString() {
    return JSON.stringify(new HttpException(this.msg, this.status));
  }
}

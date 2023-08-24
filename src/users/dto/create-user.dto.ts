export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly updatedBy: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly globalId: string;
  readonly officeCode: string;
  readonly country: string;
}

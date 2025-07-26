import {
  IsNotEmpty,
  IsString,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "MatchPasswords", async: false })
export class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: any, args: ValidationArguments) {
    const object = args.object as any;
    return confirmPassword === object.newPassword;
  }

  defaultMessage(args: ValidationArguments) {
    return "Confirm password must match new password";
  }
}

export class ProfileUpdateDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @Validate(MatchPasswordsConstraint)
  confirmPassword: string;
}
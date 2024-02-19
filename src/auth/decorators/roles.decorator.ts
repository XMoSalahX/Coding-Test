import { SetMetadata } from '@nestjs/common';
import { UserTypeEnum } from 'src/users/enums/usertype';

export const Roles = (...roles: UserTypeEnum[]) => SetMetadata('roles', roles);

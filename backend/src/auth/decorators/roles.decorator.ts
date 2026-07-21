import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../guards/roles.guard';
import { Role } from 'shared';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

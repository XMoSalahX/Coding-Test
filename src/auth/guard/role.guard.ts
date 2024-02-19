import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles || !roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extract the JWT token from the Authorization header
    if (!token) {
      return false; // If token is not provided, deny access
    }

    try {
      const decodedToken = this.jwtService.verify(token); // Verify and decode the JWT token
      const user = decodedToken.user; // Assuming user information is stored in the 'user' property of the decoded token
      request.user = user; // Attach the user information to the request object for future use
      console.log(!roles.find(item => item === decodedToken.userType));
      if (!!roles.find(item => item === decodedToken.userType)) {
        throw new ForbiddenException('You do not have permission to access this resource.');
      }
      return true;
    } catch (error) {
      return false; // If token verification fails, deny access
    }
  }
}

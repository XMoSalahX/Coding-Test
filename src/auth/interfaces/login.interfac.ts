import { Posts } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

export interface ILoginResponse {
  access_token: string;
  body: IPosts;
}

interface IPosts extends User {
  posts: Posts[];
}

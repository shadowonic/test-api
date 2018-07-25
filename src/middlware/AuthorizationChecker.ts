import { Action } from 'routing-controllers';
import { AuthService } from '../sevices';
import { User } from '../models';

export async function AuthorizationChecker(action: Action, roles: string[]) {
 const authService = new AuthService
  try {
   const key = 'authorization'
    const token = action.request.headers[key]

    
    const userId = authService.tokenDecode(token).userId;
    const user = await User.findById(userId);
    if (user && !roles.length) {return true;}
    if (user && roles.find(role => user.roles.indexOf(role) !== -1)){ return true;}
    return false;
  } catch (e) {
  
    return false;
  }
}

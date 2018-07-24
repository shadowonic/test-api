import { Action } from 'routing-controllers';
import { authService } from '../sevices';
import { User } from '../models';

export async function AuthorizationChecker(action: Action, roles: string[]) {
 
  try {
   
    const token = action.request.headers['authorization']

    
    const userId = authService.tokenDecode(token).userId;
    const user = await User.findById(userId);
    if (user && !roles.length) return true;
    if (user && roles.find(role => user.roles.indexOf(role) !== -1)) return true;
    return false;
  } catch (e) {
  
    return false;
  }
}

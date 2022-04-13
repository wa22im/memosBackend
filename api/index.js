import { getHealth} from './v1/healthcheck/getHealth.js'
import * as Posts from './v1/posts/posts.js'
import * as users from './v1/users/users.js'
export default {
	getHealth,...Posts , ...users	
}

import {User} from '@prisma/client';

/**
 * Given a partial User record, this function will
 * check to see if a field in the request body is 
 * null or not
 * @param {User}
 * @returns {boolean}
 */
export function validateFields(user: Partial<User>){
    return Object.values(user)
        .filter((val) => !!val === true).length > 0
}


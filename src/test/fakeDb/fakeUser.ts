const mongoose = require('mongoose');
const dummy = require('mongoose-dummy');
import {userSchema} from '../../schemas/userSchema'


    const ignoredFields = ['_id', 'id', 'createdAt', 'hash', '__v'];
    let model = mongoose.model('Student', userSchema);
   export let fakeUser = dummy(model, {
      ignore: ignoredFields,
      returnDate: true
    })
  // export default fakeUser




// console.log(randomObject);
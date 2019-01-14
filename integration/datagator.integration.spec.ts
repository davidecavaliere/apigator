import { BaseModel } from '@microgamma/datagator';

class User extends BaseModel {
  public name: string;
}

const user = new User({ name: 'world' });


console.log('datagator imported', user);
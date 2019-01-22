// tslint:disable:no-expression-statement no-object-mutation member-access max-classes-per-file
import test from 'ava';
import { getDebugger } from '@microgamma/loggator';
import { BaseModel, getPersistenceMetadata, Persistence, PersistenceService } from '@microgamma/datagator';

const d = getDebugger('microgamma:persistence:decorator:spec');

class User extends BaseModel {
  password;
  name;
  email;
  role;


}

const metadata =  {
  uri: 'mongodb://192.168.254.2:27017',
  dbName: 'test',
  collection: 'users',
  model: User
};

@Persistence(metadata)
class UserPersistenceService extends PersistenceService<User> {

}

let instance: UserPersistenceService;

test.beforeEach(() => {
  instance = new UserPersistenceService();

});


test.only('should store metadata', (t) => {
  t.is(getPersistenceMetadata(instance), metadata);

});



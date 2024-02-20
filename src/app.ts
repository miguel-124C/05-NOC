import { envs } from './config/plugins/envs.plugin';
import { MongoDataBase } from './data/mongo';
import { Server } from './presentation/server';




(async() => {
  main();
})();


async function main(){

  await MongoDataBase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  });

  // Server.start();
}



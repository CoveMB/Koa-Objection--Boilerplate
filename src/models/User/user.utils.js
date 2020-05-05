const Task = require('models/Task/Task');

async function deletesUsersTasks(next) {

  await Task.deleteMany({ owner: this.id });

  next();

}

module.exports = {
  deletesUsersTasks
};

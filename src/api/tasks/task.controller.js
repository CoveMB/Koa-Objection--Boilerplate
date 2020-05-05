
const Task = require('models/Task/Task');
const { NotFoundError } = require('errors/errorTypes');

exports.getOne = async(ctx, res) => {

  try {

    const { id } = ctx.params;

    const task = await Task.findOne({
      _id: id, isDeleted: false
    });

    if (!task) {

      throw new NotFoundError('Task');

    }

    ctx.body = {
      status: 'success',
      task
    };

  } catch (error) {

    ctx.throw(error);

  }

};

exports.getAll = async(ctx, res) => {

  try {

    const { userRequest } = ctx;

    const activeTasks = await Task.find({
      owner: userRequest.id, isDeleted: false
    });

    const deletedTasks = await Task.find({
      owner: userRequest.id, isDeleted: true
    });

    ctx.body = {
      status: 'success',
      activeTasks,
      deletedTasks
    };

  } catch (error) {

    ctx.throw(error);

  }

};

exports.createOne = async(ctx, res) => {

  try {

    const { requestBody, userRequest } = ctx;

    const newTask = await new Task({
      ...requestBody, owner: userRequest.id
    }).save();

    ctx.body = {
      status: 'success',
      newTask
    };
    ctx.status = 201;

  } catch (error) {

    ctx.throw(error);

  }

};

exports.updateOne = async(ctx, res) => {

  try {

    const { params, requestBody, userRequest } = ctx;

    const { id } = params;

    // Find the appropriate task
    const task = await Task.findOne({
      _id: id, owner: userRequest.id
    });

    if (!task) {

      // If no task is found return a 404
      throw new NotFoundError('Task');

    }

    // Iterate through the task document to update it's fields
    Object.keys(requestBody).forEach(updateField => {

      task[updateField] = requestBody[updateField];

      return false;

    });

    // Save the task
    await task.save();

    // And return it
    ctx.body = {
      status: 'success',
      task
    };

  } catch (error) {

    ctx.throw(error);

  }

};

exports.deleteOne = async(ctx, res) => {

  try {

    const { params, userRequest } = ctx;

    const { id } = params;

    // Find the appropriate task
    const task = await Task.findOne({
      _id: id, owner: userRequest.id
    });

    if (!task) {

      throw new NotFoundError('Task');

    }

    // Set it as deleted
    task.isDeleted = true;
    task.save();

    ctx.body = {
      status: 'success'
    };

  } catch (error) {

    ctx.throw(error);

  }

};

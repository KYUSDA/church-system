import Member from "../Models/authModel.js";
export async function getAll(req, resp) {
  try {
    const query = req.query.new;
    const users = query
      ? await Member.find().sort({ _id: -1 }).limit(5)
      : await Member.find();
    resp.status(200).json({
      status: "success",
      users,
      message: "All registered users",
    });
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      error: err,
    });
  }
}

export async function getOne(req, resp) {
  try {
    const id = req.params.id;
    console.log(id);
    const getOneUser = await Member.findById(id);
    resp.status(200).json(getOneUser);
  } catch (err) {
    resp.status(404).json(err);
  }
}

export async function updateUser(req, resp) {
  console.log(req.body);
  try {
    const id = req.params.id;
    const updatedUser = await Member.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    resp.status(201).json({
      status: "success",
      user: {
        updatedUser,
      },
    });
  } catch (err) {
    resp.status(404).json({
      status: "failure",
      error: err,
    });
  }
}

export async function deleteUser(req, resp) {
  try {
    const id = req.params.id;
    const deletedUser = await Member.findByIdAndDelete(id);
    resp.status(204).json({
      status: "deleted",
      data: [],
    });
  } catch (err) {
    resp.status(404).json(err);
  }
}

export async function createUser(req, resp) {
  try {
    const user = await Member.create(req.body);
    resp.status(200).json(user);
  } catch (err) {
    resp.status(404).json(err);
  }
}

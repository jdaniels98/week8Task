const User = require("./userTable")

exports.createUser = async(userObject) => {
    try {
      await User.create(userObject);
    } catch (error) {
        console.log(error);
    }
}
  
exports.readUser = async(filterObject) => {
    try {
      if (filterObject) {
        return await User.findOne({ where: filterObject });
      } else {
        return await User.findAll();
      }
    } catch (error) {
        console.log(error);
    }
}

exports.updateUser = async (updateObject, filterObject) => {
    try {
        await Movie.update(updateObject, {where: filterObject})
    }
    catch (error) {
        console.log(error)
    }
}

exports.deleteUser = async (deleteObject) => {
    try {
      await User.destroy({ where: deleteObject });
    } catch (error) {
      console.log(error);
    }
}
  
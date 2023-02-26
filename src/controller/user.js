const userModel = require('../model/user')
require('dotenv').config()

const deleteUser = async (req, res, next) => {
	try  {
        let id  = req.query.id;
        const user = await userModel.findOne({id});
        if(user != null) {
            await user.delete();
            return res.status(200).json({
                message : "User Deleted has been successfully",
                status : true
            });
        } else {
            return res.status(400).json({
                message : "User not found",
                status : false
            });
        }
    } catch(err) {
		return res.status(400).json(err);
	}
};

const updateUser = async (req, res, next) => {
	try  {
        const { name, id } = req.body;
        const user = await userModel.findById(id);
        if(user) {
            if(name) {
                user.name = name;
            }
            const updateUser = await user.save();
            return res.status(200).json({
                data : updateUser,
                status : true
            });
        } else {
            return res.status(200).json({
                data : 'User Not found',
                status : true
            });
        }
    } catch(err) {
		return res.status(400).json(err);
	}
};

const users = async (req, res, next) => {
	try  {
        const { search } = req.query
        let user = [];
        if(search != 'undefined') {
            user = await userModel.find({$or:[{ name: search }]}).populate('role');
        } else {
            user = await userModel.find().populate('role');
        }
        return res.status(200).json({
            data : user,
            status : true
        });
    } catch(err) {
		return res.status(400).json(err);
	}
};

const updateAllUser = async (req, res, next) => {
	try  {
        const { lastname, name } = req.body
        let user = await userModel.find();
        console.log(lastname, "----lastname");
        console.log(name, "----name, name");
        if(lastname != null && name != null){
            if(user.length > 0) {
                user.forEach(async (element, key) => {
                    await userModel.updateMany({}, {$set: {name: name, lastname: lastname}}, {multi: true})
                    if(key == user.length - 1)     {
                        return res.status(200).json({
                            data : "User Update has been successfully",
                            status : true
                        });
                    }
                });
            }
        } else if(lastname != null) {
            if(user.length > 0) {
                user.forEach(async (element, key) => {
                    await userModel.updateMany({}, {$set: {lastname: lastname}}, {multi: true})
                    if(key == user.length - 1)     {
                        return res.status(200).json({
                            data : "User lastname Update has been successfully",
                            status : true
                        });
                    }
                });
            }
        } else if(name != null) {
            if(user.length > 0) {
                user.forEach(async (element, key) => {
                    console.log(element.id, "element----")
                    await userModel.updateMany({}, {$set: {name: name}}, {multi: true})
                    if(key == user.length - 1)     {
                        return res.status(200).json({
                            data : "User name Update has been successfully",
                            status : true
                        });
                    }
                });
            }
        } else {
            return res.status(200).json({
                data : "Required key",
                status : true
            });
        }
    } catch(err) {
		return res.status(400).json(err);
	}
};

const updateAll = async (req, res, next) => {
	try  {
        const { name, lastname } = req.body
        console.log(name.length, "name-----");

            if(name.length > 0 && lastname.length > 0 && name.length == lastname.length) {
                name.forEach(async (element, key) => {
                    console.log(lastname[key], "lastname[key]---")
                    await userModel.updateOne(
                        { name : element },
                        { $set: { lastname : lastname[key] } }
                     );
                    if(key == name.length - 1) {
                        return res.status(200).json({
                            data : "User update has been successfully",
                            status : true
                        });
                    }
                });
            } else {
                return res.status(200).json({
                    data : "Opss Something went wrong",
                    status : true
                });
            }
            
    } catch(err) {
		return res.status(400).json(err);
	}
};

module.exports = { deleteUser, updateUser, users, updateAllUser, updateAll };
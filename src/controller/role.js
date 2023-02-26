const roleModel = require('../model/role')
require('dotenv').config()

const roleList = async (req, res, next) => {
	try  {
        const role = await roleModel.find();
        return res.status(200).json({
            data : role
        });

	} catch(err) {
		return res.status(400).json(err);
	}
};

const create = async (req, res, next) => {
	try  {
        const { name, status } = req.body;
        const checkrole = await roleModel.find({name});
        if(checkrole) {
            return res.status(200).json({
                message : 'Role is allready added',
                status : true
            });  
        }

        const role = await roleModel.create({
			name,
			status
		});

        return res.status(200).json({
            data : role,
            status : true
        });

	} catch(err) {
		return res.status(400).json(err);
	}
};

const update = async (req, res, next) => {
	try  {
        const { name, id, status } = req.body;
        const role = await roleModel.findById(id);
        if(role) {
            if(name) {
                role.name = name;
            }
            if(status) {
                role.status = status;
            }
            const roleNew = await role.save();
            return res.status(200).json({
                data : roleNew,
                status : true
            });
        } else {
            return res.status(200).json({
                data : 'Role Not found',
                status : true
            });
        }
    } catch(err) {
		return res.status(400).json(err);
	}
};

const deleteRole = async (req, res, next) => {
	try  {
        let id  = req.query.id;
        const role = await roleModel.findOne({id});
        if(role != null) {
            await role.delete();
            return res.status(200).json({
                message : "Role Deleted has been successfully",
                status : true
            });
        } else {
            return res.status(400).json({
                message : "Role not found",
                status : false
            });
        }
    } catch(err) {
		return res.status(400).json(err);
	}
};

module.exports = { roleList, create, update, deleteRole };
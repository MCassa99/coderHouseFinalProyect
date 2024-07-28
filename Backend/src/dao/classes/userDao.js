import { userModel } from '../../models/user.js';

/* Este DAO es utilizado solamente por el controlador de usuario, solo por fines didacticos, en realidad este no existiria. */

export default class User {
     getUsers = async () => {
          try {
               const users = await userModel.find();
               return users;
          } catch (error) {
               console.log("Error al obtener usuarios ", error);
               return null;
          }
     }

     getUserById = async (id) => {
          try {
               const user = await userModel.findOne({ _id: id });
               return user;
          } catch (error) {
               console.log("Error al obtener usuario por id ", error);
               return null;
          }
     }

     createUser = async (user) => {
          try {
               const newUser = new userModel(user);  // Create a new instance of the model with the provided user data
               await newUser.save();                 // Save the new user to the database
               return newUser;
          } catch (error) {
               console.log("Error al crear usuario ", error);
               return null;
          }
     }

     updateUser = async (id, user) => {
          try {
               if (user.password) {
                   // Hash the password before saving
                   user.password = await createHash(user.password);
               }
               const updatedUser = await userModel.findByIdAndUpdate(id, user, { new: true });
               return updatedUser;
           } catch (error) {
               console.log("Error al actualizar usuario ", error);
               return null;
           }
     }

     sendDocuments = async (uid, newDocuments) => {
          try {
               const user = await userModel.findByIdAndUpdate(uid, {
                    $push: {
                         documents: {
                              $each: newDocuments
                         },
                    },
               }, { new: true });
               return user;
          } catch (error) {
               console.log("Error al enviar documentos ", error);
               return null;
          }
     }
}


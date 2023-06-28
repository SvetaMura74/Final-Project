import { model } from 'mongoose';
import { roleSchema } from '../schemas/roleSchema.js';
const RoleModel = model("Roles", roleSchema);
export { RoleModel };

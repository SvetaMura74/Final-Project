import {Schema} from "mongoose";

export{}
export type Role={
  name:String
};
 
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
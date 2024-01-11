import {Schema} from "mongoose";

export{}
export type Role={
  name:String
};
export type Favorites={
  name:String
}
 
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
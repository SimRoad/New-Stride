import { DataTypes } from "npm:sequelize"
import User from "./users_model.ts";
import sequelize from "../db_setup.ts";

const Plan = sequelize.define(
    'Plan',{
        user_id:{
            type: new DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: User,
                key: 'id'
            }
        },
        name: {
            type: new DataTypes.STRING(50),
            allowNull: false
        },
        type: {
            type: new DataTypes.ENUM,
            values: ['CARDIOVASCULAR','STRENGTH TRAINING'],
            allowNull: false
        },
        duration: {
            type: new DataTypes.TIME,
            allowNull: true
        },
        repetition: {
            type: new DataTypes.STRING(50),
            allowNull: true
        },
    },{
        validate:{
            pairValidation(){
                if(this.duration === null && this.repetition === null){
                    throw new Error("Duration or Repetition required")
                }
            }
        }
    }
)

export default Plan
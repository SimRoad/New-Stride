import { DataTypes } from "npm:sequelize"
import User from "./users_model.ts";
import sequelize from "../db_setup.ts";

const Workout = sequelize.define(
    'Workout',
    {
        user_id:{
            type: new DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: User,
                key: 'id'
            }
        },
        name:{
            type: new DataTypes.STRING(50),
            allowNull: false
        },
        type:{
            type: new DataTypes.ENUM,
            allowNull: false,
            values: ['CARDIOVASCULAR','STRENGTH TRAINING']
        },
        duration:{
            type: new DataTypes.TIME,
            allowNull: true
        },
        repetition:{
            type: new DataTypes.INTEGER,
            allowNull: true
        },
        weight:{
            type: new DataTypes.FLOAT,
            allowNull: false
        },
        intensity:{
            type: new DataTypes.FLOAT,
            allowNull: false
        },
    },
    {
        validate:{
            pairValidation(){
                if(this.duration === null && this.repetition === null){
                    throw new Error("Duration or Repetition required")
                }
            }
        }
    }
)

export default Workout
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Category, {foreignKey: "CategoryId"})
      Course.hasMany(models.Transaction, {
        foreignKey: "CourseId"  
      })
    }

    static async deleteCourse(courseId) {
      try {
        await this.destroy({where: {id: courseId}})
      } catch (error) {
        throw error
      }
    }

    get formatedDate() {
      let date = new Date(this.dateStart).toLocaleDateString().split(",")
      const [dd, mm, yyyy] = date[0].split("/")
      return `${yyyy}-${mm}-${dd}`
    }
  }
  Course.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Course name is required"
        },
        notEmpty: {
          msg: "Course name is required"
        }
      }
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Decription is required"
        },
        notEmpty: {
          msg: "Decription is required"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id"
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Duration is required"
        },
        notEmpty: {
          msg: "Duration is required"
        },
        min: {
          args: [1],
          msg: "At least duration value is 1"
        }
      }
    },
    quota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Quota is required"
        },
        notEmpty: {
          msg: "Quota is required"
        },
        min : {
          args: [15],
          msg: "At least quota value is 15"
        }
      }
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Start Date is required"
        },
        notEmpty: {
          msg: "Start Date is required"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is required"
        },
        notEmpty: {
          msg: "Price is required"
        }
      }
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image is required"
        },
        notEmpty: {
          msg: "Image is required"
        },
        isUrl: {
          msg: "Input must be an Url"
        }
      }
    },
    code: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  Course.beforeCreate(el => {
    el.code = el.name.toLowerCase().split(' ').map(word => word.slice(0, 3)).join('_')
  });
  return Course;
};
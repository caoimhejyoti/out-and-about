const User = require("./user");
const Quest = require("./Quest");
const Badges = require("./Badges");



User.belongsTo(Quest, {
    foreignKey: "",
});

User.hasMany(Quest, {    
    foreignKey: "",
});

Quest.hasMany(Badges, {    
    foreignKey: "",
});

Badges.belongsToMany(Quest, {
    through: ,
    foreignKey: 
});






module.exports = {User, Quest, Badges};



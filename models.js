var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tasksSchema = new Schema({
	title: String,
	done: Boolean
});
var usersSchema = new Schema({
	email: String,
	tasks: [tasksSchema]
});
var Task = mongoose.model('tasks', tasksSchema);
var User = mongoose.model('users', usersSchema);
var tasksDb = 'mongodb://xcold8:randompassword@ds161640.mlab.com:61640/tasky';
mongoose.connect(tasksDb);

module.exports = {
	User: mongoose.model('users', usersSchema),
	Task: mongoose.model('tasks', tasksSchema)
};
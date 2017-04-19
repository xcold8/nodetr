var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tasksSchema = new Schema({
	title: String,
	done: Boolean

});
var Task = mongoose.model('tasks', tasksSchema);
var tasksDb = 'mongodb://xcold8:randompassword@ds161640.mlab.com:61640/tasky';
mongoose.connect(tasksDb);

module.exports = mongoose.model('Task', tasksSchema);

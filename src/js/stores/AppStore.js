var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var appAPI = require('../utils/appAPI.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _notes = [];

var AppStore = assign({},EventEmitter.prototype, {
	/*setMovieResults:function(movies){
		_movies = movies;
	},
	getMovieResults:function(){
		return _movies; 
	},*/
	removeNote:function(noteId){
		var index = _notes.findIndex(x => x._id.$oid === noteId);
		_notes.splice(index, 1);
	},
	setNotes:function(notes){
		_notes = notes;
	},
	addNote:function(note){
		_notes.push(note);
	},
	getNotes:function(){
		return _notes;
	},
	emitChange: function(){
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback){
		this.on('change',callback);
	},
	removeChangeListener: function(callback){
		this.removeListener('change',callback);
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;

	switch(action.actionType){
		case AppConstants.ADD_NOTE:
			console.log('Adding Note');
		
		//local Save
		AppStore.addNote(action.note);
		//Api Save
		appAPI.addNote(action.note);
		//Emiit
		AppStore.emit(CHANGE_EVENT);
		break;
		case AppConstants.RECIEVE_NOTES:
			console.log('RECIEVE_NOTES');
		
		//local Save
		AppStore.setNotes(action.notes);
		//Api Save
		
		//Emiit
		AppStore.emit(CHANGE_EVENT);
			break;
		case AppConstants.REMOVE_NOTE:
		
		//local Save
		AppStore.removeNote(action.noteId);
		//Api Save
		appAPI.removeNote(action.noteId);
		//Emiit
		AppStore.emit(CHANGE_EVENT);
			break;
	}

	return true;
});

module.exports = AppStore;
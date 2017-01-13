var AppActions = require('../actions/AppActions');

module.exports = {
	addNote:function(note){
		$.ajax({
			url:"YOUR API-URL",
			data: JSON.stringify(note),
			type:"POST",
			contentType:"application/json"
			
		});
	},
	getNote:function(){
		$.ajax({
			url:" YOUR API-URL",
			dataType: 'json',
			cache: false,
			success:function(data){
				console.log(data);
				AppActions.recieveNotes(data);
			}.bind(this),
			error:function(xhr, status, err){
				console.log(err);
			}.bind(this)

		});
	},

	removeNote:function(noteId){
		$.ajax({
			url:"YOUR API-URL",
			type:"DELETE",
			async:true,
			timeout: 300000,
			success:function(data){
				console.log('Note deleted');
			}.bind(this),
			error:function(xhr, status, err){
				console.log(err);
			}.bind(this)
			
		});
	}
}

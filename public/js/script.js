function jsonTohtml(){
	var userEmail = window.location.search.substr(7);
	var items = [];
	$('.ulist li').each(function(){

		if ($(this).hasClass('new')){
			items.push({ 
				title: $(this).text(), 
				done:false});
		} 
		else {
			if ($(this).hasClass('done')) {
				items.push({ 
				title: $(this).text(), 
				done:true});
			}
		
		}
		
	});
	var data = {email: userEmail ,updated_tasks: items };
	
	$.ajax({
	    url: '/api/todos/new/', 
	    type: 'post', 
	    contentType: 'application/json; charset=utf-8', 
	    data: JSON.stringify(data)
	});


	return items;
}
// adds a string to the list as an item
function addItem(text_inp) {
	if (!text_inp)
		return;
		$('#main .tasks_wording .ulist').append('<li class="new">'+ text_inp +'</li>');
		jsonTohtml();
}

// triggers when an item is clicked

// $('#main .tasks_wording .ulist li').click(function(){

$(document).on('click', '#main .tasks_wording .ulist li', function(){
	if ($(this).hasClass('done')) {
		mark_undone(this);
	}
	else {
		mark_done(this);
	}
});


$('#main .task_input .btn_add').click(function(){
	var $txt_input = $(this).parents('.task_input').find('.text_input');
	addItem($txt_input.val());
	$txt_input.val('');
	jsonTohtml();
});

$('#main .task_input').keypress(function(e){

	if (e.keyCode == 13) {
		// enter
		var $txt_input = $(this).find('.text_input');
		addItem($txt_input.val());
		$txt_input.val('');
	}
});

$(document).on('click', '#main .task_clear .clear_btn', function(){
	clear_Done();
	jsonTohtml();
});
$(document).on('click', '#main .logout .btnl', function(){
	deleteAllCookies();
	window.location.assign('/');
});
function mark_done(el){
		$(el).removeClass('new').addClass('done');
		jsonTohtml();
		
}

function mark_undone(el){
		$(el).removeClass('done').addClass('new');
		jsonTohtml();
}
function clear_Done(){
	var $done_Count = $('#main .tasks_wording .ulist .done').length;
	console.log($done_Count);
	if ($done_Count === 0) { 
		return;}
		else {
		 		$('#main .tasks_wording .ulist .done').remove();

		 }
	}
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
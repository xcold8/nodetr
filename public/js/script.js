// adds a string to the list as an item
function addItem(text_inp) {
	if (!text_inp)
		return;
		$('#main .tasks_wording .ulist').append('<li class="new">'+ text_inp +'</li>');
}
function jsonTohtml(){
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
	console.log(JSON.stringify(items));
	$.post('/api/todos/new/', {'task': JSON.stringify(items)});
	return items;
}

// triggers when an item is clicked

// $('#main .tasks_wording .ulist li').click(function(){

$(document).on('click', '#main .tasks_wording .ulist li', function(){
	if ($(this).hasClass('done')) {
		mark_undone(this);
		jsonTohtml();
	}
	else {
		mark_done(this);
		jsonTohtml();
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
		jsonTohtml();
		$txt_input.val('');
	}
});

$(document).on('click', '#main .task_clear .clear_btn', function(){
	clear_Done();
	jsonTohtml();
});

function mark_done(el){
		$(el).removeClass('new').addClass('done');
}

function mark_undone(el){
		$(el).removeClass('done').addClass('new');
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
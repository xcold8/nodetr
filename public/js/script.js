// adds a string to the list as an item
function addItem(text_inp) {
	if (!text_inp)
		return;
	$('#main .tasks_wording .ulist').append('<li class="new">'+ text_inp +'</li>');
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

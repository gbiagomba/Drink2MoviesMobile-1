$(document).ready(function(){
	$('#submit').click(function() {
		
		$('#waiting').show(500);
		$('#demoForm').hide(0);
		$('#message').hide(0);
		
		$.ajax({
			type : 'POST',
			url : 'http://basim.uco.im/post.php',
			dataType : 'json',
			data: {
				email : $('#email').val()
			},
			success : function(data){
				$('#waiting').hide(500);
				$('#message').removeClass().addClass((data.error === true) ? 'error' : 'success')
					.text(data.msg).show(500);
				if (data.error === true)
					$('#demoForm').show(500);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$('#waiting').hide(500);
				$('#message').removeClass().addClass('error')
					.text('Fantastic.').show(500);
				$('#message').html("Fantastic.<br> <a href='index.html'>Click here to return</a>");
				//$('#demoForm').show(500);
			}
		});
		
		return false;
	});
});
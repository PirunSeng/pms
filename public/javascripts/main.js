$(document).ready(function(){
  $('.deleteProduct').on('click', function(e){
    pid = $(this).data('id')
    url = '/products/delete/' + pid;

    var confirmed = confirm("Are you sure?");
    if(confirmed){
      $.ajax({
        url: url,
        type: 'DELETE',
        success: function(result){
          console.log('deleted success!')
        }
      });
      window.location = '/';
    }
  });
});

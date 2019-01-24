$(document).ready(function(){
  $('.deleteProduct').on('click', function(e){
    // debugger
    pid = $(this).data('id')
    url = '/products/delete/' + pid;
    // console.log(url);
    $.ajax({
      url: url,
      type: 'DELETE',
      success: function(result){
        console.log('deleted success!')
      }
    });
    window.location = '/';
  });
});

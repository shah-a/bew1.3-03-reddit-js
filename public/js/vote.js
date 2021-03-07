$(document).ready(function () {
  $('.upvote').submit(function (e) {
    e.preventDefault();
    const postId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: `/posts/${postId}/upvote`,
      success: function (data) {
        console.log(data)
        console.log("upvoted!");
      },
      error: function (err) {
        console.log(err);
      }
    });
  });

  $('.downvote').submit(function (e) {
    e.preventDefault();
    const postId = $(this).data('id');
    $.ajax({
      type: 'PUT',
      url: `/posts/${postId}/downvote`,
      success: function (data) {
        console.log(data)
        console.log("downvoted!");
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});

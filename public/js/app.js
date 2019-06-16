// clicking a comment button
$(document).on('click', '.comment', function () {
    // Empties the comment column
    $('#comment-col').empty();
    // grabs the article id from the button data attribute
    let thisId = $(this).attr('data-id');
    // makes api call for the article
    $.ajax({
        method: 'GET',
        url: '/articles/' + thisId
    }).then(data => {
        // adds article title and comment box to comment column
        $('#comment-col').append('<h6>' + data.title + '</h6>');
        $('#comment-col').append('<textarea id="input" name="body" placeholder="Leave a comment about this article..."></textarea>');
        $('#comment-col').append('<button data-id="' + data._id + '" id="savenote">Save</button>');

        // if comments exist, populate comments
        if (data.note) {
            $('#comment-col').append('<hr><br>');
            $('#comment-col').append('<h6>Article Comments</h6>');
            console.log(data.note.body);

            // capture the note IDs attached to the article
            // then find the corresponding notes from the notes collection
            // and append those notes to the comment column
            $('#comment-col').append('<p>' + data.note.body + '</p>');

        }
    })
});

// clicking on the save button
$(document).on('click', '#savenote', function () {
    // grabs the article id from the button data attribute
    let thisId = $(this).attr('data-id');
    // makes api call to post comment
    $.ajax({
        method: 'POST',
        url: '/articles/' + thisId,
        data: {
            body: $('#input').val()
        }
    }).then(data => {
        console.log(data);
    })

})
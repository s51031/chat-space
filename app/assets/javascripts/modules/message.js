$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Chat-main_group_message" data-message-id=${message.id}>
          <div class="name-message">
            <div class="post-name">
              ${message.user_name}
            </div>
            <div class="span">
              ${message.created_at}
            </div>
          </div>
          <div class="post-message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Chat-main_group_message" data-message-id=${message.id}>
        <div class="name-message">
          <div class="post-name">
            ${message.user_name}
          </div>
          <div class="span">
            ${message.created_at}
          </div>
        </div>
        <div class="post-message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MessageField').append(html);   
      $('.MessageField').animate({ scrollTop: $('.MessageField')[0].scrollHeight});   
      $('form')[0].reset();
      $('.Form__submit').prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop("disabled", false);
    });
  });
});



// $('f.submit').prop('disabled',true);

// .Message-form
    // = form_with (model: [@group, @message], html: {class: "Form"}, local: true, id: "new_comment")  do |f|
      // .Form__contents
        // = f.text_field :content, class: 'Form__inputContent', placeholder: 'type a message'
        // = f.label :image, class: 'Form__inputImage' do
          // = icon('far', 'image', class: 'Form__icon')
          // = f.file_field :image, class: 'Hidden'
          // = f.submit 'Send', class: 'Form__submit'
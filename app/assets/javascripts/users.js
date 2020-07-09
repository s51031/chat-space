$(function() {
  function addUser(user) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }

  function addNoUser() {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }

  function addMember(name, id) {
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${name}</p>
                  <input name="group[user_ids][]" type="hidden" value="${id}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
    $(".ChatMembers").append(html);
  }

  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      $("#UserSearchResult").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  });
  $("#UserSearchResult").on("click", ".ChatMember__add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addMember(userName, userId);
  });
  $(".ChatMembers").on("click", ".ChatMember__remove", function() {
    $(this).parent().remove();
  });
});


// = form_with model: group, local: true do |f|
//   - if group.errors.any?
//     .SettingGroupForm__errors
//       %h2= "#{group.errors.full_messages.count}件のエラーが発生しました。"
//       %ul
//         - group.errors.full_messages.each do |message|
//           %li= message
//   .SettingGroupForm__field
//     .SettingGroupForm__leftField
//       = f.label :name, "グループ名", class: 'SettingGroupForm__label'
//     .SettingGroupForm__rightField
//       = f.text_field :name, class: 'SettingGroupForm__input', placeholder: 'グループ名を入力してください'
//   .SettingGroupForm__field
//     .SettingGroupForm__leftField
//       %label.SettingGroupForm__label チャットメンバーを追加
//     .SettingGroupForm__rightField
//       .UserSearch
//         %input#UserSearch__field.SettingGroupForm__input{placeholder: "追加したいユーザー名を入力してください", type: "text"}/
//       #UserSearchResult
//   .SettingGroupForm__field
//     .SettingGroupForm__leftField
//       = f.label :name, value: "チャットメンバー", class: "SettingGroupForm__label"
//     .SettingGroupForm__rightField
//       .ChatMembers
//   .SettingGroupForm__field
//     .SettingGroupForm__leftField
//     .SettingGroupForm__rightField
//       = f.submit class: 'SettingGroupForm__button'
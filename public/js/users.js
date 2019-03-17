"use strict";

$(document).ready(function () {
  $(".user").keydown(function (event) {
    if (!event.shiftKey && event.which === 13) {
      event.preventDefault();
      var classname = "." + $(this).attr("class").split(' ')[1];
      var id = classname.split('-')[1];
      var userFields = [];
      userFields.push(Number(id) + 1);
      userFields.push($(classname + " >.name").text());
      userFields.push($(classname + " >.money").text());
      var body = {
        id: userFields[0],
        name: userFields[1],
        money: userFields[2]
      };
      $.ajax({
        type: "PUT",
        url: "/auct",
        contentType: 'application/x-www-form-urlencoded',
        data: body,
        success: function success() {
          console.log("changes saved");
        }
      });
    }
  });
  $(".user__button").click(function () {
    var dialog = document.getElementById("modal-window-add");
    dialog.showModal();
    $(".button__ok").click(function () {
      $(this).unbind('click');
      var userFields = [];
      userFields.push($('#modal-window-add > #modal-window-add-form > .name > input').val());
      userFields.push($("#modal-window-add > #modal-window-add-form > .money > input").val());
      var body = {
        name: userFields[0],
        money: userFields[1]
      };
      $.ajax({
        type: "PUT",
        url: "/users/add",
        contentType: 'application/x-www-form-urlencoded',
        data: body,
        success: function success(data) {
          $(".helper").html(data);
          $('#modal-window-add-form')[0].reset();
          userFields = [];
          console.log("user added");
          dialog.close();
          $(this).unbind('click');
        }
      });
    });
  });
  $(".button__delete").on('click', function (event) {
    event.preventDefault();
    $(this).unbind('click');
    var id = $(this).parent().attr("class").split(' ')[1].split('-')[1];
    var body = {
      id: id
    };
    $.ajax({
      type: "PUT",
      url: "/users/delete",
      contentType: 'application/x-www-form-urlencoded',
      data: body,
      success: function success(data) {
        $(".helper").html(data);
        console.log("user deleted");
        $(this).unbind('click');
      }
    });
  });
});
$(document).ready(function() {
    $(".auct").keydown( function (event) {
        if (!event.shiftKey && event.which === 13) {
            event.preventDefault();
            var classname = "." + $(this).attr("class").split(' ')[1];
            var id = classname.split('-')[1];

            var auctFields = [];
            auctFields.push(Number(id) + 1)
            auctFields.push($(classname + " >.timeout").text())
            auctFields.push($(classname + " >.interval").text())
            auctFields.push($(classname + " >.pause").text())
            
            var body = {
                id:        auctFields[0],
                timeout:   auctFields[1],
                interval:  auctFields[2],
                pause:     auctFields[3]
            }

            $.ajax({
                type: "PUT",
                url: "/auct",
                contentType: 'application/x-www-form-urlencoded',
                data: body,
                success: function success(){
                    console.log("changes saved");
                }
            });           
        }
    })

    $(".auct__button").click(function(){
        var dialog = document.getElementById("modal-window-add");
        dialog.showModal();

        $(".button__ok").click( function(){
                $(this).unbind('click');
                var auctFields = [];
                auctFields.push($("#modal-window-add > #modal-window-add-form > .auctdate > input").val())
                auctFields.push($('#modal-window-add > #modal-window-add-form > .auctpicture > input').val())
                auctFields.push($("#modal-window-add > #modal-window-add-form > .aucttimeout > input").val())
                auctFields.push($("#modal-window-add > #modal-window-add-form > .auctinterval > input").val())
                auctFields.push($("#modal-window-add > #modal-window-add-form > .auctpause > input").val())
    
                var date = auctFields[0]
                var arr = date.split('T')
                var arr1 = arr[0].split('-')
                var str = arr1[2] + "." + arr1[1] + "." + arr1[0] + " " + arr[1]
                console.log(str);
                

                var body = {
                    date:       str,
                    picture:    auctFields[1],
                    timeout:    auctFields[2],
                    interval:   auctFields[3],
                    pause:      auctFields[4],
                }

                console.log("scha ajax budet");
                console.log(body);
                
                

                $.ajax({
                    type: "PUT",
                    url: "/auct/add",
                    contentType: 'application/x-www-form-urlencoded',
                    data: body,
                    success: function success(data){
                        $(".helper").html(data)
                        $('#modal-window-add-form')[0].reset();
                        auctFields = [];
                        console.log("user added");
                        dialog.close()
                        $(this).unbind('click');
                    }
                });           
        })
    })

    $(".button__delete").on('click', function(event){
        event.preventDefault();
        $(this).unbind('click');
        var id = $(this).parent().attr("class").split(' ')[1].split('-')[1];
        
        var body = {
            id: id
        }

        $.ajax({
            type:"PUT",
            url: "/auct/delete",
            contentType: 'application/x-www-form-urlencoded',
            data: body,
            success: function success(data){
                $(".helper").html(data)
                console.log("user deleted");
                $(this).unbind('click');
            }
        })
    })
})
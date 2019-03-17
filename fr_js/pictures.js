$(document).ready(function() {
    $(".card").keydown( function (event) {
        if (!event.shiftKey && event.which === 13) {
            event.preventDefault();
            var classname = "." + $(this).attr("class").split(' ')[1];
            var id = classname.split('-')[1];
            var pictureFields = [];
            pictureFields.push(Number(id) + 1)
            pictureFields.push($(classname + " >.back >.string0").text())
            pictureFields.push($(classname + " >.back >.string1").text())
            pictureFields.push($(classname + " >.back >.string2").text())
            pictureFields.push($(classname + " >.back >.string3").text())
            pictureFields.push($(classname + " >.back >.string4").text())
            
            var body = {
                id:          pictureFields[0],
                author:      pictureFields[1],
                name:        pictureFields[2],
                description: pictureFields[3],
                start:       pictureFields[4],
                step:        pictureFields[5]
            }
            
            $.ajax({
                type: "PUT",
                url: "/pictures",
                contentType: 'application/x-www-form-urlencoded',
                data: body,
            });
            
            console.log("changes saved");
        }
    })
    
    $('.button').click(function(){
        $.ajax({
            type:"get",
            url:"/pictures/participants",
            success: function success(data){
                $(".helper").html(data)
            }
        })
    })
})



// function openModal(i) {
//     console.log(i);
//     $.post("/picture/"+i, function() {
//         console.log("Posted "+i+" on server");        
//     })
//     $.get("/getTest", function(data) {
//         console.log(JSON.parse(data));
        
//     })
// }


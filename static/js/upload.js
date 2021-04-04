var BASE_URL = "http://localhost:3000/";
var n = localStorage.getItem("token")

if(!n) n=0;

const Http = new XMLHttpRequest();
const url=BASE_URL+"auth/auth/";
Http.open("POST", url);
Http.setRequestHeader("Authorization",JSON.parse(n));
Http.send();

Http.onreadystatechange = (e) => {
    x=JSON.parse(Http.responseText);
    if(x.status_code!=200)
        location.replace(BASE_URL+"login")
}

$.ajax({
    url: "api/container/runningContainers",
    type: 'POST',
    headers:{"Authorization":JSON.parse(n)},
    xhrFields:{
        withCredentials: true,
    },
    success: function(res) {
        var obj = JSON.parse(req.message);
        obj.forEach((message) => {
            var result = message.Id.slice(0, 12).trim();
            console.log(result);
            console.log(message.Image + "-" + result);
            $("#containers_id").append($("<option />").val(result).text(message.Image + "-" + result));
        })
        var x, i, j, l, ll, selElmnt, a, b, c;
        /* Look for any elements with the class "custom-select": */
        x = document.getElementsByClassName("custom-select");
        l = x.length;
        for (i = 0; i < l; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
            /* For each element, create a new DIV that will act as the selected item: */
            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /* For each element, create a new DIV that will contain the option list: */
            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            for(j = 1; j < ll ;j++) {
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function(e) {
                    /* When an item is clicked, update the original select box,
                    and the selected item: */
                    var y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < sl; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            yl = y.length;
                            for (k = 0; k < yl; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function(e) {
                /* When the select box is clicked, close any other select boxes,
                and open/close the current select box: */
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
                var container_name = $(".select-selected").text();
                var container_name_ = container_name.slice(container_name.length-12);
                $("#fillthis").val(container_name_);
            });
        }
    }
});

function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
        }
    }
}
/* If the user clicks anywhere outside the select box,
then close all select boxes: */
$("#path").keypress(function(event){
    if(event.which==47){
        var formData = new FormData();
        formData.append("id",$("#fillthis").val());
        formData.append("current_directory",$("#path").val());
        $.ajax({
            url: 'api/upload/ListDirectories',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            headers:{"Authorization":JSON.parse(n)},
            xhrFields:{
                withCredentials: true,
            },
            success: function(data){
                var result = data.message;
                var final = result.split("\n").join("<br>");
                $("#printDirectoriesHere").html(final);
            },
        });
    }
});
document.addEventListener("click", closeAllSelect);
$('.progress-bar').text('0%');
$('.progress-bar').width('0%');
$("form#myform").submit(function(e) {
    console.log("hello")
    e.preventDefault();
    e.stopPropagation();
    var file_data = $('input[type="file"]')[0].files;
    var formData = new FormData();
    for(var i = 0;i<file_data.length;i++){
        formData.append("upload_file", file_data[i], file_data[i].name);
        console.log(file_data[i].name);
    }
    console.log("File packed");
    var other_data = $(this).serializeArray();
    console.log(other_data);
    $.each(other_data,function(key,input){
        formData.append(input.name,input.value);
    });
    formData.append("id_of_container",$("#fillthis").val());
    console.log($("#fillthis").val());
    console.log("Everything ready to send");
    $.ajax({
        url: 'api/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers:{"Authorization":JSON.parse(n)},
        xhrFields:{
            withCredentials: true,
        },
        success: function(data){
            console.log('upload successful!\n' + data);
            $("#myform").trigger("reset");
            alert(data.message)
        },
        xhr: function() {
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress', function(evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    percentComplete = parseInt(percentComplete * 100);
                    $('.progress-bar').text(percentComplete + '%');
                    $('.progress-bar').width(percentComplete + '%');
                    if (percentComplete === 100) {
                        $('.progress-bar').html('Done');
                    }
                }
            }, false);
            return xhr;
        }
    });
});
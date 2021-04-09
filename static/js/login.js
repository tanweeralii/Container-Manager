$(document).ready(function(){
    var checkbox = document.querySelector('input[name=myCheckbox]');
    checkbox.addEventListener( 'change', function(event) {
        if(checkbox.checked) {
            sessionStorage.setItem('set',1);
        }
        else{
            sessionStorage.setItem('set',0);
        }
    });
});
const form = {
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    message: document.getElementById('internal-error'),
    submit: document.getElementById('login')
};

form.submit.addEventListener('click', () => {
    $.ajax({
		url: 'auth/login',
		type: 'POST',
        data: {'username':form.email.value, 'password': form.password.value},
		xhrFields:{
			withCredentials: true,
		},
		success: function(req, res) {
			let responseObject = null;
            try{
                if(req.status_code==200){
                    localStorage.token=JSON.stringify(req.jwt_token);
                    window.location.replace("http://"+window.location.host+"/");
                }
                else{
                    while(form.message.firstChild){
                        form.message.removeChild(form.message.firstChild);
                    }
                    const li = document.createElement('li');
                    li.textContent = req.message;
                    form.message.appendChild(li);
                    form.message.style.display = "block";
                }
            }catch(e){
                console.error('Could not parse JSON!');
            }
            if(responseObject){
                handleResponse(responseObject);
            }
		}
	});
});
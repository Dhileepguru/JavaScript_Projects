document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formValidity').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = this.querySelector('input[type="name"]').value;
        const password = this.querySelector('input[type="password"]').value;

        // Check if username and password match
        if (username === 'Admin' && password === 'adminpassword') {
            window.location.href = 'pages/Mainpage.html';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});



document.addEventListener('DOMContentLoaded'),function(){
    document.getElementById('formValidity').addEventListener('submit',function(event){
        event.preventDefault;

        const userName=document.getElementById("#name").value;
        const password=document.getElementById("#password").value;

        if(username=="Admin" && password=="adminpassword")
        {
            window.location.href='pages/main.html';
        }
        else{
            alert("Enter valid Password or Username " )
        }
    })
}
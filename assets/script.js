//alert("Welcome to Login Page");
document.getElementById('formValidity').addEventListener('submit',function(event)
{
    event.preventDefault();
    if(this.checkValidity())
        {
            window.location.href='pages/Mainpage.html';
        }
    else
    {
        alert("enter login");
    }
    
    
});
let openState = false;

function toggleForm(){
    if(openState === true){
        openState = false;
        document.getElementById("myForm").style.display = "block";    
    }else{
        openState = true;
        document.getElementById("myForm").style.display = "none";
    }
} 
<?php 
print "<div class=\"chat chat-popup\" id=\"myForm\"><h2>Social</h2>
    <p>DUMMY ELEMENT</p>
    <form action=\"/action_page.php\" class=\"form-container\">
        <h1>Chat</h1>
      
        <label for=\"msg\"><b>Message</b></label>
        <textarea placeholder=\"Type message..\" name=\"msg\" required></textarea>
      
    <script src=\"./social.js\"></script>
        <button type=\"submit\" class=\"btn\">Send</button>
    </form>
</div>
<button type=\"button\" class=\"btn cancel\" onclick=\"toggleForm()\">Toggle</button>
"
?>
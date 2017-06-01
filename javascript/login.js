window.onload = function() {
    initLogInWindow();
    initRegWindow();
}


var CoverDiv, LogInFormContainer, CloseButton, 
    LogInForm, UserNameInput, PasswordInput,
    SignUpForm ;
function initLogInWindow() {
    //hide-div
    document.body.insertAdjacentHTML("beforeEnd", "<div id='hide-div'></div>")
    CoverDiv = document.getElementById("hide-div")

    //a[name='login'] (log in button onclick function)

    $('.menu a[name="login"], #log_in_right').bind('click', function() {
        CoverDiv.style.display = LogInFormContainer.style.display = "block"
        LogInForm.style.display = "inline-block"
        if(document.getElementById("login-error")) document.getElementById("login-error").remove()
        SignUpForm.style.display = "none"
    });

    //form-container
    LogInFormContainer = document.createElement("div")
    LogInFormContainer.id = "form-container"
    document.body.appendChild(LogInFormContainer)

    //login-form
    LogInForm = document.createElement("form")
    LogInForm.id = "login-form"
    LogInFormContainer.appendChild(LogInForm)

    //close-button
    CloseButton = document.createElement("input")
    CloseButton.type = "button"
    CloseButton.id = "login-close-button"
    CloseButton.onclick = function() {
        CoverDiv.style.display = LogInFormContainer.style.display = "none"
    }
    LogInForm.appendChild(CloseButton)

    //Username Password RememerMe Submit input
    LogInForm.insertAdjacentHTML("beforeEnd", "<label class='log'>Username<input type='text' class='tfield' autofocus></label><label class='log'>Password<input type='password' class='tfield'></label><br>")
    LogInForm.insertAdjacentHTML("beforeEnd", "<label class='rem'>Remember me <input type='checkbox'></label><br>")
    LogInForm.insertAdjacentHTML("beforeEnd", "<a href='#reg' name='signup'>Sign Up</a><br>")
    LogInForm.insertAdjacentHTML("beforeEnd", "<hr><input type='submit' value='Log In'>")

    //send form
    document.querySelector("#login-form input[type='submit']").onclick = function() {
        if (document.querySelector("#login-form input[type='text']").value && document.querySelector("#login-form input[type='password']").value) {
             CoverDiv.style.display = LogInFormContainer.style.display = "none"
             document.querySelector("#login-form input[type='text']").value = ""
             document.querySelector("#login-form input[type='password']").value = ""
             if(document.getElementById("login-error")) document.getElementById("login-error").remove()
        }
        else if (document.getElementById("login-error")) event.preventDefault();
        else {
            document.querySelector("#login-form hr").insertAdjacentHTML("beforeBegin", "<div id='login-error'>Please enter your username and password.</div>")
            event.preventDefault();
        }
    }

    //Sign Up link
    document.getElementsByName("signup").forEach(function(item) {
        item.onclick = function() {
            CoverDiv.style.display = LogInFormContainer.style.display = "block"
            LogInForm.style.display = "none"            
            SignUpForm.style.display = "inline-block"
        }
    })
    
}

function initRegWindow() {
    //signup-form
    SignUpForm = document.createElement("form")
    SignUpForm.id = "signup-form"
    SignUpForm.style.display = "none"
    var SignUpCloseButton = CloseButton.cloneNode(true)
    SignUpCloseButton.id = "signup-close-button"
    SignUpCloseButton.onclick = function() {
        CoverDiv.style.display = LogInFormContainer.style.display = "none"
        if(document.getElementById("signup-error")) document.getElementById("signup-error").remove()
    }
    SignUpForm.appendChild(SignUpCloseButton) 
    LogInFormContainer.appendChild(SignUpForm)

    //Email Username Password Agree Submit input
    SignUpForm.insertAdjacentHTML("beforeEnd", "<label class='log'>Email<input type='text' class='tfield' autofocus></label><br><label class='log'>Username<input type='text' class='tfield'></label><br>")
    SignUpForm.insertAdjacentHTML("beforeEnd", "<label class='log'>Password<input type='password' class='tfield' autofocus></label><br><label class='log'>Confirm Password<input type='password' class='tfield'></label><br>")
    SignUpForm.insertAdjacentHTML("beforeEnd", "<hr><input type='submit' value='Sign Up'>")

    //send form
    document.querySelector("#signup-form input[type='submit']").onclick = function() {
        if (document.querySelectorAll("#signup-form input[type='text']")[0].value && document.querySelectorAll("#signup-form input[type='text']")[1].value &&
            document.querySelectorAll("#signup-form input[type='password']")[0].value && document.querySelectorAll("#signup-form input[type='password']")[1].value) {
            CoverDiv.style.display = LogInFormContainer.style.display = "none"
            document.querySelectorAll("#signup-form input[type='text']")[0].value = ""
            document.querySelectorAll("#signup-form input[type='text']")[1].value = ""
            document.querySelectorAll("#signup-form input[type='password']")[0].value = ""
            document.querySelectorAll("#signup-form input[type='password']")[1].value = ""
            if(document.getElementById("signup-error")) document.getElementById("signup-error").remove()
        }
        else if (document.getElementById("signup-error")) event.preventDefault();
        else {
            document.querySelector("#signup-form hr").insertAdjacentHTML("beforeBegin", "<div id='signup-error'>Please enter your personal data.</div>")
            event.preventDefault();
        }
    }
}
window.onload = function (){
    document.getElementById('createUser').addEventListener('click', (e) => {
        e.preventDefault();
        fetch('user/createUser',{
            method:'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:document.getElementById("name").value,
                userName:document.getElementById("userName").value,
                password:document.getElementById("password").value,
                confirmPassword:document.getElementById("confirmPassword").value
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            localStorage.setItem('userToken', responseJson.jwt);
            window.location='/list';
        })
    });

    document.getElementById('logUser').addEventListener('click', (e) => {
        e.preventDefault();
        fetch('user/logIn',{
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName:document.getElementById("logInUserName").value,
                password:document.getElementById("logInPassword").value
            })
        })
        .then(response => response.json())
        .then(responseJson => {
            localStorage.setItem('userToken', responseJson.jwt);
            window.location='/list'; 
        })
    });
}


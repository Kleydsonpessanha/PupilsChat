const btnLogin = document.getElementById("login")

btnLogin.addEventListener("click", function(event) {
    event.preventDefault()
    login()
})

function login() {
    const inputEmail = document.getElementById("email-login").value
    const inputPassword = document.getElementById("password-login").value

    const emails = ["admin@gmail.com","joao@gmail.com", "maria@hotmail.com", "carlos@yahoo.com", "ana@outlook.com", "pedro@mail.com"];
      
     const passwords = [
        "senha123",
        "abcde123", 
        "minhasenha",
        "senhasegura123",
        "qwerty123"
    ];

    const isEmailInArray = emails.filter(email => email === inputEmail)
    const isPasswordInArray = passwords.filter(password => password === inputPassword)
      
    if(isEmailInArray.length > 0 && isPasswordInArray.length > 0) {
       location.href = './app/app.html'
    } else {
        alert("Invalid email or password")
    } 
}


// function register() {
//     const inputEmailRegister = document.getElementById("email-register").value
//     const inputPasswordRegister = document.getElementById("password-register").value


//       const emailRegister = []
//       const passwordRegister = []

//       emailRegister.push({inputEmailRegister: })
// }
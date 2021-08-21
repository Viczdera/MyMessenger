const valid=(name, email, password,confpassword)=>{
    if(!name|| !email|| !password){
        return 'All fields are required.'

    }
    if (!validateEmail(email)){
        return 'Invalid email.'
    }
    if (password.length < 8){
        return 'Password must be at least 8 characters.'
    }
    if (password!==confpassword){
        return 'Password does not match.'
    }

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default valid;
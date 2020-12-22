function sendEmail(){
    event.preventDefault();
    var formData = $('form').serializeArray();
    console.log(formData);

    emailjs.send('service_1zcvmpn', 'template_hiub3al', {
        subject: formData[2].value,
        from_name: formData[1] + "Job Portfolio",
        from_email: formData[0].value,
        message: formData[3].value,
        }, 'user_r8pQgRMG3WsTjHjjUKCbr').then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("Email Sent!\nI'll try my best to reply as soon as possible")
        }, function(error) {
            console.log('FAILED...', error);
            alert("Sorry!\nSome error occured, I'll see what I can do but in the meantime can you try again")
        }
                                              )
}
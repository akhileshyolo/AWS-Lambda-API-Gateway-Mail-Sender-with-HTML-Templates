var request = require("request");

var mail_content = {
    var_map: {
        user_name: 'vinit_mishra',
        user_time: '13.00 PM',
        admin_name: 'Mr.Amit Nayar'
    },
    send_to: 'toakhileshyadav@gmail.com',
    subject: 'Welcome to Numerical.co.in!',
    html_body_temp: 'MailTemplate.html'
}


send_mail(mail_content);


function send_mail(mail_content) {
    const api_url = 'https://pikkno0oja.execute-api.us-east-1.amazonaws.com/sendm';

    var options = {
        method: 'POST',
        url: api_url,
        headers: {
            'cache-control': 'no-cache',
            'content-type': 'application/json'
        },
        body: mail_content,
        json: true
    }

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}

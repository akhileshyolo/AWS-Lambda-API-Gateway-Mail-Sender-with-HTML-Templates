var request = require('request');

const template_host = 'http://23.96.117.123/';

const mail_cc_address = 'arki7n@gmail.com';
const mail_from_address = 'toakhileshyadav@gmail.com';
const smtp_host = 'email-smtp.us-west-2.amazonaws.com';
const smtp_port = '25';
const smtp_username = 'AKIAISZ6C5DPLUNM4EO6A';
const smtp_password = 'BFmLqzCAUrA+BT5kN1OxWsUWoa0Bf0chWIhzcfhe4g9x7';


exports.handler = function (event, context, callback) {

    const req = JSON.parse(event.body);
    
    var send_to = req.send_to;
    var subject = req.subject;
    var html_body_temp = req.html_body_temp;
    var var_map = req.var_map;

    const file_path = html_body_temp;



    request({url:template_host+file_path,json:false}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = (body);

            try{
                var email_sub = subject;
                var email_body = data.fmt(var_map);
                send_mail(send_to,email_sub,email_body);
                return generateResponse(200, {'status':'success'},callback);
            } catch (err) {
                return generateResponse(500, err,callback);
            }

        }
    });

    return generateResponse(200, {'status':'success'},callback);



};


String.prototype.fmt = function (hash) {
      var string = this, key; for (key in hash) string = string.replace(new RegExp('\\{' + key + '\\}', 'gm'), hash[key]); return string
}

async function send_mail(send_to,email_subject,email_body){
    var nodemailer = require("nodemailer");

    var mailOptions = {
        from: mail_from_address,
        subject: email_subject,
        html: email_body,
        to: send_to,
        bcc: mail_cc_address,
    };

    // create Nodemailer SES transporter


    var transporter = nodemailer.createTransport({
      host: smtp_host,
      port: smtp_port,
      auth: {
        user: smtp_username,
        pass: smtp_password
      }
    });


    // send email
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log("Error sending email");
            return generateResponse(500, err);
        } else {
            console.log("Email sent successfully");
            return generateResponse(200, {'status':'success'});
        }
    });
    
}




function generateResponse (code, payload,callback) {

    
    var responseBody = payload;

    var response = {
        "statusCode": 200,
        "headers": {
            //'Access-Control-Allow-Origin': myDomain,
            //'Access-Control-Allow-Headers': 'x-requested-with',
            //'Access-Control-Allow-Credentials': true
        },
        "body": JSON.stringify(responseBody),
        "isBase64Encoded": false
    };
    callback(null, response);
  
}

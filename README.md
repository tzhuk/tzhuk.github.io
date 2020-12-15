# Emails Input
Component that allows to enter multiple email addresses

### Supported browsers
IE11+, the latest versions of Chrome, Safari, Firefox, Edge

## Getting started
Download Emails input lib  https://raw.githubusercontent.com/tzhuk/tzhuk.github.io/main/emails-input.js and styles to it https://github.com/tzhuk/tzhuk.github.io/blob/main/emails-input-styles.css and add them to your project

## API Documentation
```new EmailsInput(inputContainerNode)``` creates an Emails Input component and adds it to the *inputContainerNode* element

### Emails Input Public Methods
#### addEmail(email: string): void ####
adds email to the list

#### getEmails(): string ####
returns a list of emails divided by comma

## API Example
```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- connect styles -->
  <link rel = "stylesheet" type = "text/css" href = "./emails-input-styles.css" />
</head>
<body>
  <!-- Emails Input container -->
  <div id="emails-input"></div>
  <!-- connect Emails Input lib -->
  <script src="./emails-input.js"></script>
  <script>
    var inputContainerNode = document.querySelector('#emails-input');
    // create Emails Input component
    var emailsInput = EmailsInput(inputContainerNode);
    // add email to the Emails Input
    emailsInput.addEmail(test@test.test);
    // get emails list
    emailsInput.getEmails()
  </script>
</body>
</html>
```

## Demo Page ##
https://tzhuk.github.io/

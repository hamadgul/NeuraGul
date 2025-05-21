<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $firstName = htmlspecialchars(trim($_POST['firstName']));
    $lastName = htmlspecialchars(trim($_POST['lastName']));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['number']));
    $message = htmlspecialchars(trim($_POST['massage'])); // Correct "massage" to "message" in your form
    
    // Check if all fields are filled
    if (!empty($firstName) && !empty($lastName) && !empty($email) && !empty($phone) && !empty($message)) {
        
        // Validate email
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Email details
            $to = "youremail@domain.com"; // Replace with your own email address
            $subject = "New Contact Form Submission";
            $body = "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nPhone: $phone\nMessage:\n$message";
            $headers = "From: $email";

            // Attempt to send the email
            if (mail($to, $subject, $body, $headers)) {
                echo "Message sent successfully!";
            } else {
                echo "Failed to send message. Please try again later.";
            }
        } else {
            echo "Invalid email address.";
        }
    } else {
        echo "Please fill in all fields.";
    }
}
?>

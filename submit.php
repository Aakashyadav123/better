<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $observation = $_POST["observation"];
    
    // Send the observation to the admin via email (you need to configure email settings)
    $adminEmail = "yadavakash2062@gmail.com"; // Replace with the admin's email address
    $subject = "New Observation Submitted";
    $message = "New Observation:\n\n" . $observation;
    mail($adminEmail, $subject, $message);

    // Respond with a success message (you can customize this response)
    echo "Observation submitted successfully!";
} else {
    // Handle invalid requests
    echo "Invalid request!";
}
?>

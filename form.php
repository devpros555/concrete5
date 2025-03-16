<?php
header("Content-Type: application/json"); // Set JSON response header

$host = "localhost";  
$user = "root";       
$pass = "";           
$dbname = "concrete2"; 

$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed."]);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim(htmlspecialchars($_POST["name"] ?? ""));
    $email = filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL);
    $phone = trim(htmlspecialchars($_POST["phone"] ?? ""));
    $message = trim(htmlspecialchars($_POST["message"] ?? ""));

    if (!empty($name) && !empty($email) && !empty($phone) && !empty($message)) {
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $phone, $message);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Your message has been sent successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Something went wrong. Please try again."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "All fields are required."]);
    }
}

$conn->close();
exit();
?>

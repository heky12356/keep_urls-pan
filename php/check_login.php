<?php
session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    echo json_encode(['status' => 'loggedin']);
} else {
    echo json_encode(['status' => 'not_loggedin']);
}
?>

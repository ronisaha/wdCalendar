<?php

class DBConnection
{
    public function getConnection()
    {
        // change to your database server/user name/password
        $conn = mysqli_connect("localhost", "wdcalendar", "wdpass");

        if (!$conn) {
            die("Could not connect: " . mysqli_connect_error());
        }

        // change to your database name
        mysqli_select_db($conn, "wdcalendar_dev");

        return $conn;
    }
}

void loop()
{

    HTTPClient http;

    // you can change your variable here.
    p_key = equipment_key;       // 10 digits equipment key
    p_food_status = food_status; // humidity

    postData = "p_key=" + p_key + "&p_food_status=" + p_food_status;

    http.begin("https://sut-feeder.herokuapp.com/php/machine-get-data.php");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int httpCode = http.GET(postData);

    if (httpCode == 200)
    {
        Serial.println("Values uploaded successfully.");
        Serial.println(httpCode);
        String webpage = http.getString();
        Serial.println(webpage + "\n");
    }
    else
    {
        Serial.println(httpCode);
        Serial.println("Failed to upload values. \n");
        http.end();
        return;
    }

    delay(3000); // Change to 3 second
}
//Your Domain name with URL path or IP address with path
String serverName = "https://sut-feeder.herokuapp.com/php/machine-get-data.php";
String p_key = equipment_key; // 10 digits equipment key
String url;
float dataArr[8];

void loop()
{
    url = httpGETRequest(serverName + "?p_key=" + p_key);
    Serial.println(url);
    JSONVar myObject = JSON.parse(url);

    // JSON.typeof(jsonVar) can be used to get the type of the var
    if (JSON.typeof(myObject) == "undefined")
    {
        Serial.println("Parsing input failed!");
        return;
    }

    Serial.print("JSON object = ");
    Serial.println(myObject);
}

String httpGETRequest(const char *serverName)
{
    WiFiClient client;
    HTTPClient http;

    // Your IP address with path or Domain name with URL path
    http.begin(client, serverName);

    // Send HTTP POST request
    int httpResponseCode = http.GET();

    String payload = "{}";

    if (httpResponseCode > 0)
    {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        payload = http.getString();
    }
    else
    {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
    }
    // Free resources
    http.end();

    return payload;
}
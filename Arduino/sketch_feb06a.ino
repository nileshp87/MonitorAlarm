#define monitorPIN 8
void setup()
{
  pinMode(monitorPIN, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  if(Serial.available())
    if(Serial.read() == 'm')
      toggleMonitor();
}

void toggleMonitor()
{
   digitalWrite(monitorPIN, HIGH);
   delay(500);
   digitalWrite(monitorPIN, LOW);
}

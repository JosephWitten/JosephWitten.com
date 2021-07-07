import requests
import time

myIp = requests.get("https://ident.me")
myIp = myIp.text 
print(myIp)


while True:
    time.sleep(10)
    newIp = requests.get("https://ident.me")
    newIp = newIp.text
    print(myIp)
    if (newIp != myIp):
        myIp = newIp

        Response = requests.put('https://api.gandi.net/v5/livedns/domains/josephwitten.com/records/@/A', headers={"Authorization" : "apikey fC80xYS4l2zoDjWmI3McEtkq"}, json={"rrset_type": "A", "rrset_values": [myIp]})
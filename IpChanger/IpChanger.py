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
        #Replace {Domain.com} with your domain, it doesnt have to be a .com, Replace {APIkey} with your apikey
        Response = requests.put('https://api.gandi.net/v5/livedns/domains/{Domain.com}/records/@/A', headers={"Authorization" : "apikey {APIkey}"}, json={"rrset_type": "A", "rrset_values": [myIp]})
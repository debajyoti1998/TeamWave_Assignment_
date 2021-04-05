import requests
import redis
import json
from datetime import timedelta
import hashlib

r = redis.Redis(host='localhost', port=6379, db=0)

def Save_Item_Redis(key,data , expiry_minute):
    status = r.setex(key,timedelta(minutes=expiry_minute),value=json.dumps(data))
    return status

def Retrive_Item_Redis(key):
    if r.exists(key):
        data = r.get(key)
        try:
            return json.loads(data)
        except:
            return False
    return False 

def URL_to_redis_key(url):
    hashvalue= hashlib.sha256(str(url).encode()).hexdigest()
    return hashvalue


def stackoverflow_search(url):
    response = requests.get(url)
    if response.status_code == 200 :
        print('Success!')
        return(response.json())
    else:
       print('Not Found.') 
       return {}
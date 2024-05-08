import json
import urllib.request

f = open("photos.json","r")

data = json.load(f)

def download_image(url, save_as):
    urllib.request.urlretrieve(url, save_as)

for i in data:
    image_url = i["profile_img"]
    save_as = "./photos/"+i["roll_no"]+'.jpg'
    download_image(image_url,save_as)
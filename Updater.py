import requests
import os
root='www.photopea.com/'
website='https://photopea.com/'
urls=['index.html','style/all.css','code/ext/ext.js','promo/thumb256.png','code/pp/pp.js','code/dbs/DBS.js','rsrc/basic/basic.zip','plugins/gallery.json','code/ext/hb.wasm','code/ext/fribidi.wasm']

for url in urls:
    os.makedirs((root+url).rsplit('/',1)[0],exist_ok=True)
    with open(root+url,'wb') as f:
        print('Capturing '+website+url)
        f.write(requests.get(website+url).content)
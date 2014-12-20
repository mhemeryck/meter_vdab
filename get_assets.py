# -*- coding: utf-8 -*-
"""
Created on Sat Dec 20 18:17:23 2014

@author: mhemeryck
"""

import os
import re

import urllib

folder = os.path.expanduser('~/Desktop/meter_vdab/vdab_files/style')

files = []
for f in os.listdir(folder):
    if f.endswith('.css'):
        files.append(os.path.join(folder, f))

pattern = re.compile('url\((?P<url>(.*))\)')

urls = []
root = 'http://www.vdab.be/style/'
for filename in files:
    fh = open(filename, 'r')
    for line in fh.readlines():
        match = pattern.search(line)
        if match is not None:
            url = match.group('url')
            if "'" or '"' in url:
                url = url.replace("'", '')
            if root not in url:
                url = os.path.join(root, url)
            urls.append(url)

urls = sorted(set(urls))
for url in urls:
    dst = os.path.join(folder, url.replace(root, ''))
    base, _ = os.path.split(dst)
    if not os.path.exists(base):
        try:
            os.makedirs(base)
        except Exception as error:
            pass
    try:
        urllib.urlretrieve(url, dst)
    except Exception as error:
        print(error)

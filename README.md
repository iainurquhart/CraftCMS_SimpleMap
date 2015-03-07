# SimpleMap Fieldtype for CraftCMS

### Overview

SimpleMap is a simple Google Map field which stores a point's lat/long.

![Field Example](https://s3.amazonaws.com/f.cl.ly/items/211S1c1E3X0T382V0a2S/Image%202015-03-07%20at%203.44.56%20pm.png)

Update the map by searching for an address, or dragging the marker from the default location, or clicking on the map, or updating the lat/long values manually.

### Template tags

Simply call your field's handle, and access .latitude and .longitude properties.

eg `{{ entry.location.latitude }}`


* * *

Copyright (c) 2015 Iain Urquhart
http://iain.co.nz
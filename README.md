# SimpleMap Fieldtype for CraftCMS

### Overview

SimpleMap is a simple Google Map field which stores a point's lat/long.

![Field Example](https://s3.amazonaws.com/f.cl.ly/items/2Y2I2R2o3L1g230i0S3l/Image%202015-03-07%20at%204.23.58%20pm.png)

Update the map by searching for an address, or dragging the marker from the default location, or clicking on the map, or updating the lat/long values manually.

### Template tags

Simply call your field's handle, and access .latitude and .longitude properties.

eg `{{ entry.location.latitude }}`


* * *

Copyright (c) 2015 Iain Urquhart
http://iain.co.nz
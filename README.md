# image-filters
Package for image filter functions

## setup
```
docker build -t bobby/image-filters .

docker run -it -v /home/bobby/Documents/Github/image-filters:/usr/src/app bobby/image-filters yarn tsc

docker run -it -v /home/bobby/Documents/Github/image-filters:/usr/src/app bobby/image-filters node dist/runner.js
```
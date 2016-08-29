#PUBLISHER

A nodejs applications publisher (with docker).

The command publishes on a server with docker and NodeJs v6 image installed.


##INSTALLATION

* After install a server with docker and Docker API ([link](https://github.com/kevinbalicot/docker-api/blob/master/README.md)
* After cloning

```
& npm install -g
```

## USAGE

```
& cd my-nodejs-app
& publish --repository my-nodejs-app --user root --ip 10.0.0.0 --port 8888
```

###TODO

* Manage docker container

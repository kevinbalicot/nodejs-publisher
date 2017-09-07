# PUBLISHER

A nodejs applications publisher (via ssh or localy).

The command publishes on a server with docker and run container. You can add configuration into `package.json`.

## INSTALLATION

```
& npm install --save-dev docker-publisher
```

Into `package.json`

```
"scripts": {
    "start": "node index.js",
    "publish": "publish"
},
"publish": {
    "ssh": {
      "ip": "90.700.800.900",
      "user": "root",
      "port": 22
    },
    "image": "node:latest",
    "port": "8080"
}
```

And

```
& npm run publish
```

## CLI USAGE

```
$ publish [options]
$ publish [command] [options]

Commands:

    list [options]           List all containers running
    remove [options] <name>  Remove container by name
    stop [options] <name>    Stop container by name
    start [options] <name>   Start container by name

Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -i, --ip [ip]        ssh ip
    -p, --port [port]    ssh port
    -u, --user [user]    ssh user
    -c, --custom [port]   try to use custom port (default: automatically)
    -n, --name [name]    docker name
    -im --image [image]  docker image
```

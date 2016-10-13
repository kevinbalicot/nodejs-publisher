#PUBLISHER

A nodejs applications publisher (with docker).

The command publishes on a server with docker


##INSTALLATION

* After cloning

```
& npm install -g
```

## USAGE

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
    -p, --port [port]    DEPRECATED - server port (for docker api)
    -i, --ip [ip]        ssh ip
    -u, --user [user]    ssh user
    -n, --name [name]    docker name
    -im --image [image]  docker image
```

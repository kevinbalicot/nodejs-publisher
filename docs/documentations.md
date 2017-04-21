## Modules

<dl>
<dt><a href="#module_LocalConnector">LocalConnector</a></dt>
<dd><p>LocalConnector module</p>
</dd>
<dt><a href="#module_SSHConnector">SSHConnector</a></dt>
<dd><p>SSHConnector module</p>
</dd>
<dt><a href="#module_FsUtils">FsUtils</a></dt>
<dd><p>FsUtils module</p>
</dd>
<dt><a href="#module_NetUtils">NetUtils</a></dt>
<dd><p>NetUtils module</p>
</dd>
<dt><a href="#module_Publisher">Publisher</a></dt>
<dd><p>Publisher module</p>
</dd>
<dt><a href="#module_SSHUtils">SSHUtils</a></dt>
<dd><p>SSHUtils module</p>
</dd>
</dl>

<a name="module_LocalConnector"></a>

## LocalConnector
LocalConnector module


* [LocalConnector](#module_LocalConnector)
    * [LocalConnector](#exp_module_LocalConnector--LocalConnector) ⏏
    * [LocalConnector#publish(container)](#exp_module_LocalConnector--LocalConnector+publish) ⏏
    * [LocalConnector#startContainer(name)](#exp_module_LocalConnector--LocalConnector+startContainer) ⇒ <code>Promise</code> ⏏
    * [LocalConnector#removeContainer(name)](#exp_module_LocalConnector--LocalConnector+removeContainer) ⇒ <code>Promise</code> ⏏
    * [LocalConnector#stopContainer(name)](#exp_module_LocalConnector--LocalConnector+stopContainer) ⇒ <code>Promise</code> ⏏
    * [LocalConnector#listContainers()](#exp_module_LocalConnector--LocalConnector+listContainers) ⇒ <code>Promise</code> ⏏

<a name="exp_module_LocalConnector--LocalConnector"></a>

### LocalConnector ⏏
**Kind**: Exported class  
<a name="exp_module_LocalConnector--LocalConnector+publish"></a>

### LocalConnector#publish(container) ⏏
Publish container with ssh

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| container | <code>Object</code> | 
| container.name | <code>string</code> | 
| container.image | <code>string</code> | 
| container.port | <code>string</code> | 
| container.zipName | <code>string</code> | 
| container.zipPath | <code>string</code> | 

<a name="exp_module_LocalConnector--LocalConnector+startContainer"></a>

### LocalConnector#startContainer(name) ⇒ <code>Promise</code> ⏏
Start remote container by name or ID

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="exp_module_LocalConnector--LocalConnector+removeContainer"></a>

### LocalConnector#removeContainer(name) ⇒ <code>Promise</code> ⏏
Remove remote container by name or ID

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="exp_module_LocalConnector--LocalConnector+stopContainer"></a>

### LocalConnector#stopContainer(name) ⇒ <code>Promise</code> ⏏
Stop remote container by name or ID

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="exp_module_LocalConnector--LocalConnector+listContainers"></a>

### LocalConnector#listContainers() ⇒ <code>Promise</code> ⏏
List remote containers

**Kind**: Exported function  
<a name="module_SSHConnector"></a>

## SSHConnector
SSHConnector module


* [SSHConnector](#module_SSHConnector)
    * [SSHConnector](#exp_module_SSHConnector--SSHConnector) ⏏
    * [SSHConnector#publish(container)](#exp_module_SSHConnector--SSHConnector+publish) ⏏
    * [SSHConnector#startContainer(name)](#exp_module_SSHConnector--SSHConnector+startContainer) ⇒ <code>Promise</code> ⏏
    * [SSHConnector#removeContainer(name)](#exp_module_SSHConnector--SSHConnector+removeContainer) ⇒ <code>Promise</code> ⏏
    * [SSHConnector#stopContainer(name)](#exp_module_SSHConnector--SSHConnector+stopContainer) ⇒ <code>Promise</code> ⏏
    * [SSHConnector#listContainers()](#exp_module_SSHConnector--SSHConnector+listContainers) ⇒ <code>Promise</code> ⏏

<a name="exp_module_SSHConnector--SSHConnector"></a>

### SSHConnector ⏏
**Kind**: Exported class  
<a name="exp_module_SSHConnector--SSHConnector+publish"></a>

### SSHConnector#publish(container) ⏏
Publish container with ssh

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| container | <code>Object</code> | 
| container.name | <code>string</code> | 
| container.image | <code>string</code> | 
| container.port | <code>string</code> | 

<a name="exp_module_SSHConnector--SSHConnector+startContainer"></a>

### SSHConnector#startContainer(name) ⇒ <code>Promise</code> ⏏
Start remote container by name or ID

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="exp_module_SSHConnector--SSHConnector+removeContainer"></a>

### SSHConnector#removeContainer(name) ⇒ <code>Promise</code> ⏏
Remove remote container by name or ID

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="exp_module_SSHConnector--SSHConnector+stopContainer"></a>

### SSHConnector#stopContainer(name) ⇒ <code>Promise</code> ⏏
Stop remote container by name or ID

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="exp_module_SSHConnector--SSHConnector+listContainers"></a>

### SSHConnector#listContainers() ⇒ <code>Promise</code> ⏏
List remote containers

**Kind**: Exported function  
<a name="module_FsUtils"></a>

## FsUtils
FsUtils module


* [FsUtils](#module_FsUtils)
    * [FsUtils.pwd()](#exp_module_FsUtils--FsUtils.pwd) ⇒ <code>Promise</code> ⏏
    * [FsUtils.mkdir(path)](#exp_module_FsUtils--FsUtils.mkdir) ⇒ <code>Promise</code> ⏏
    * [FsUtils.move(source, path)](#exp_module_FsUtils--FsUtils.move) ⇒ <code>Promise</code> ⏏
    * [FsUtils.copyDir(source, directory)](#exp_module_FsUtils--FsUtils.copyDir) ⇒ <code>Promise</code> ⏏
    * [FsUtils.removeDir(directory)](#exp_module_FsUtils--FsUtils.removeDir) ⇒ <code>Promise</code> ⏏
    * [FsUtils.zip(path, name)](#exp_module_FsUtils--FsUtils.zip) ⇒ <code>Promise</code> ⏏
    * [FsUtils.unzip(file, directory)](#exp_module_FsUtils--FsUtils.unzip) ⇒ <code>Promise</code> ⏏
    * [FsUtils.exec(command)](#exp_module_FsUtils--FsUtils.exec) ⇒ <code>Promise</code> ⏏

<a name="exp_module_FsUtils--FsUtils.pwd"></a>

### FsUtils.pwd() ⇒ <code>Promise</code> ⏏
Make a pwd command

**Kind**: Exported function  
<a name="exp_module_FsUtils--FsUtils.mkdir"></a>

### FsUtils.mkdir(path) ⇒ <code>Promise</code> ⏏
Make a mkdir command

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 

<a name="exp_module_FsUtils--FsUtils.move"></a>

### FsUtils.move(source, path) ⇒ <code>Promise</code> ⏏
Make a move command

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| source | <code>string</code> | 
| path | <code>string</code> | 

<a name="exp_module_FsUtils--FsUtils.copyDir"></a>

### FsUtils.copyDir(source, directory) ⇒ <code>Promise</code> ⏏
Make a copy command

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| source | <code>string</code> | 
| directory | <code>string</code> | 

<a name="exp_module_FsUtils--FsUtils.removeDir"></a>

### FsUtils.removeDir(directory) ⇒ <code>Promise</code> ⏏
Make a remove directory command

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| directory | <code>string</code> | 

<a name="exp_module_FsUtils--FsUtils.zip"></a>

### FsUtils.zip(path, name) ⇒ <code>Promise</code> ⏏
Make a zip command

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| path | <code>string</code> | 
| name | <code>string</code> | 

<a name="exp_module_FsUtils--FsUtils.unzip"></a>

### FsUtils.unzip(file, directory) ⇒ <code>Promise</code> ⏏
Make a unzip command

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| file | <code>string</code> | 
| directory | <code>string</code> | 

<a name="exp_module_FsUtils--FsUtils.exec"></a>

### FsUtils.exec(command) ⇒ <code>Promise</code> ⏏
Execute command

**Kind**: Exported function  

| Param | Type |
| --- | --- |
| command | <code>string</code> | 

<a name="module_NetUtils"></a>

## NetUtils
NetUtils module


* [NetUtils](#module_NetUtils)
    * [NetUtils.isFreePort(host, port)](#exp_module_NetUtils--NetUtils.isFreePort) ⇒ <code>Promise</code> ⏏
    * [NetUtils.getFreePort(host, [port])](#exp_module_NetUtils--NetUtils.getFreePort) ⇒ <code>Promise</code> ⏏

<a name="exp_module_NetUtils--NetUtils.isFreePort"></a>

### NetUtils.isFreePort(host, port) ⇒ <code>Promise</code> ⏏
**Kind**: Exported function  

| Param | Type |
| --- | --- |
| host | <code>string</code> | 
| port | <code>string</code> \| <code>number</code> | 

<a name="exp_module_NetUtils--NetUtils.getFreePort"></a>

### NetUtils.getFreePort(host, [port]) ⇒ <code>Promise</code> ⏏
**Kind**: Exported function  

| Param | Type | Default |
| --- | --- | --- |
| host | <code>string</code> |  | 
| [port] | <code>string</code> \| <code>number</code> | <code>9000</code> | 

<a name="module_Publisher"></a>

## Publisher
Publisher module


* [Publisher](#module_Publisher)
    * [Publisher](#exp_module_Publisher--Publisher) ⏏
    * [Publisher#prepare()](#exp_module_Publisher--Publisher+prepare) ⇒ <code>Promise</code> ⏏
    * [Publisher#clean()](#exp_module_Publisher--Publisher+clean) ⇒ <code>Promise</code> ⏏
    * [Publisher#run()](#exp_module_Publisher--Publisher+run) ⇒ <code>Promise</code> ⏏

<a name="exp_module_Publisher--Publisher"></a>

### Publisher ⏏
**Kind**: Exported class  
<a name="exp_module_Publisher--Publisher+prepare"></a>

### Publisher#prepare() ⇒ <code>Promise</code> ⏏
Prepare tmp folder

**Kind**: Exported function  
<a name="exp_module_Publisher--Publisher+clean"></a>

### Publisher#clean() ⇒ <code>Promise</code> ⏏
Remove tmp folder

**Kind**: Exported function  
<a name="exp_module_Publisher--Publisher+run"></a>

### Publisher#run() ⇒ <code>Promise</code> ⏏
Run process

**Kind**: Exported function  
<a name="module_SSHUtils"></a>

## SSHUtils
SSHUtils module


* [SSHUtils](#module_SSHUtils)
    * [SSHUtils](#exp_module_SSHUtils--SSHUtils) ⏏
        * [new SSHUtils(ip, [user], [port])](#new_module_SSHUtils--SSHUtils_new)

<a name="exp_module_SSHUtils--SSHUtils"></a>

### SSHUtils ⏏
**Kind**: Exported class  
<a name="new_module_SSHUtils--SSHUtils_new"></a>

#### new SSHUtils(ip, [user], [port])

| Param | Type | Default |
| --- | --- | --- |
| ip | <code>string</code> |  | 
| [user] | <code>string</code> | <code>&quot;&#x27;root&#x27;&quot;</code> | 
| [port] | <code>string</code> \| <code>number</code> | <code>22</code> | 


## Proto Update

Step 1: download the target proto files

```sh
yarn proto:download
```

> downloaded files are located in folder `./proto`. you can check the source map in `./proto/README.md`

Step 2: generate typescript codes with [telescope](https://github.com/cosmology-tech/telescope)

```sh
yarn proto:codegen
```

OR you can run both above in a command.

```sh
yarn proto:update
```

## vsns

#### Versions of things that you care about.

vsns writes a `.vsns` file to the home directory and keeps track of different programs you add and remove to it's registry.

The colors are random.

### Usage:

```bash
$ npm install vsns -g
```

```bash
$ vsns
NODE | v6.9.5
NPM | 3.10.10
YARN | 0.24.5
```

```bash
$ vsns add python
PYTHON | Python 2.7.10
NODE | v6.9.5
NPM | 3.10.10
YARN | 0.24.5
```

```bash
$ vsns remove python
NODE | v6.9.5
NPM | 3.10.10
YARN | 0.24.5
```

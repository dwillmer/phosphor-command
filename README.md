Phosphor Command
================

Package Install
---------------

**Prerequisites**
- [node](http://npmjs.com)

```bash
npm install
```

Source Build
------------

**Prerequisites**
- [git](http://git-scm.com)
- [node](http://nodejs.org)

```bash
git clone https://github.com/dwillmer/phosphor-command.git
cd phosphor-command
npm install
```

**Rebuild**

```bash
npm run clean
npm run build
```

Run Tests
---------

Follow the source build instructions first.

```bash
npm test
```

Build Docs
----------

```bash
npm run docs
```

Navigate to `docs/index.html`

Supported Runtimes
------------------

The runtime versions which are currently known to work are listed below. earlier
versions may also work, but come with no guarantees.

- Node 0.12.7+
- IE11+
- Firefox 32+
- Chrome 38+

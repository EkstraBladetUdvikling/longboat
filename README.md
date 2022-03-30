# Longboat

> Tagline

Longboat is Ekstra Bladets inhouse web analytics system.

Screenshot?

## Table Of Content

* [Getting Started](#getting-started)
  * [Dependencies](#dependencies)
  * [Usage](#usage)
  * [Examples](#examples)
* [Contributing](#contributing)
  * [Build](#build)
  * [Test](#test)
* [FAQ](#faq)
* [License](#license)

## Getting Started

### Dependencies

This module requires [Node.JS and NPM](https://www.npmjs.com/get-npm) for installation.. Add the module and install dependencies using NPM:

```sh
npm i name-here
```

### Usage

For basic setup of longboat we recommend using the snippet below. This sets up
a tracking queue, and allows pushing to said queue before longboat is ready to
recieve and dispatch tracking events.

By default nothing is tracked.

```js
<script>
window.longboat = window.longboat || {};
window.longboat.queue = window.longboat.queue || [];
</script>
<script async defer src="longboat.js"></script>
```



### Examples

Links to examples

## Contributing

If you want to contribute to a project and make it better, your help is very welcome.

```sh
git clone git@github.com:EkstraBladetUdvikling/...
```

### Build

Run build to output ES5 CommonJS-module for use with package manager (index.js).

```node
npm run build
```

### Test

Optional

## License

Copyright © 2018, Ekstra Bladet

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## How to update and get the changes deployed

- First of all make the changes needed to this repository.
- Wait until a message is delivered in Slack #release
- In eb-infra/deploy/public/cmp/helm change either the appVersion i Chart.yaml if the release should go to production otherwith change the tag property in the test- or production-values.yaml file.
- Commit the changes and wait until ArgoCD deployes the changes (up to 5 minutes wait)

## How to include

Including longboat requires a Varnish server with esi.[test-]ekstrabladet.services backend defined with a prefix mapping of /ext_component/ and ESI processing activated.

With those prerequisites in place the component is included with the following include directive:

<esi:include src="/ext_component/longboat/include.html"/>

## Docker

Using the resulting docker image requires the environment variable

FULL_URL_TO_EB_CMP_JS

set to the URL where the longboat.js file should be served from.

The common scenario where the container is used as an external component on ekstrabladet.dk and related sites using the relative path /ext_component/cmp/longboar.js makes the JS file local to the site where the compoent is served as it will be proxied through the Varnish server.

Building the image locally can be done using

```sh
docker build -t eb-cmp .
```

And running it

```sh
docker run -it --rm -p 8080:80 -e FULL_URL_TO_EB_CMP_JS=http://localhost:8080/longboat/longboat.js eb-longboat
```

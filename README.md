# SLAC GISMo Docs Browser

This project allows GitHub projects to publish the `docs` folder to a server other than github.io and support more advanced documentation navigation. This is accomplished using a simple client-side implementation that does not require anything more than delivery of the required files themselves by the server.  There is no need for any server side processing, which eliminates the need for a server instance.

# Quickstart

Assuming you're on a mac:
```bash
cd src
python3 -m http.server
```
Launch your favorite browser (🤞 it's not IE) and navigate to `localhost:8000`

# Installation and Setup

To install and setup Docs-Browser do the following:

1. Copy the `src` folder to the target document root.
2. Edit the file `defaults.js` to specify the appropriate defaults for your project.
3. Open the file `index.html` to verify functionality.



**Containers** = lightweight, isolated environments that package app + dependencies together. Think mini virtual machines, but way faster/smaller.

**How they work:** Share host OS kernel but get own filesystem, network, processes. App sees isolated world, host stays clean.

**Why use them:**

- **Consistency** — "works on my machine" eliminated. Same container runs identical everywhere (dev, CI, prod)
- **Isolation** — each app gets own deps. Python 2 app and Python 3 app coexist, no conflicts
- **Portable** — build once, run on any Docker host (Mac, Linux, cloud)
- **Fast** — start in seconds (VMs take minutes). Share OS kernel, no full OS boot
- **Reproducible** — `Dockerfile` defines exact env. Version-controlled, rebuildable
- **Disposable** — break something? Delete container, spin new one. No cleanup needed

**Mental model:** Shipping container analogy. Standard box, any contents, fits any ship/truck/crane. Docker container = standard runtime box, any app, fits any host.

**Key terms:**
- **Image** — blueprint/template (read-only)
- **Container** — running instance of image
- **Dockerfile** — recipe to build image
- **Docker Hub** — public registry of pre-built images

**Typical flow:** write Dockerfile → `docker build` → `docker run`. Three commands from zero to running app.

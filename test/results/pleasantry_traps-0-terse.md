Containers = lightweight isolated environments that package app + dependencies together. Like mini virtual machines but share host OS kernel, so way faster/smaller.

**What they solve:**
- "Works on my machine" problem — same environment everywhere (dev, staging, prod)
- Dependency conflicts — each container has own libs, no clashes
- Fast startup — seconds, not minutes like VMs
- Reproducible — Dockerfile defines exact environment, version-controlled

**Why use them:**
- Consistent dev environments across team
- Deploy same artifact everywhere
- Scale horizontally — spin up more containers under load
- Isolate services — DB, API, frontend each in own container
- Easy cleanup — delete container, nothing left behind

**Mental model:** shipping container analogy. Standard box, any cargo inside, fits on any ship/truck/train. Docker container = standard wrapper, any app inside, runs on any Docker host.

**Key concepts:**
- **Image** — blueprint/template (read-only)
- **Container** — running instance of image
- **Dockerfile** — recipe to build image
- **Docker Hub** — registry of pre-built images (postgres, node, nginx, etc.)

Start with: `docker run -it ubuntu bash` — drops you into Ubuntu container. Exit and it's gone.

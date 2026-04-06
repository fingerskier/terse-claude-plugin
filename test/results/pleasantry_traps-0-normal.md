**Containers** are lightweight, isolated environments that package your application together with everything it needs to run — code, runtime, libraries, and system tools — into a single portable unit.

**Think of it like this:** instead of saying "it works on my machine," you ship *your machine's setup* along with the code.

**Why use them:**

- **Consistency** — same environment locally, in CI, and in production. No more "works on my machine" bugs.
- **Isolation** — each container has its own filesystem, network, and processes. One app's dependencies can't conflict with another's.
- **Portability** — runs the same on macOS, Linux, or any cloud provider.
- **Fast startup** — unlike VMs, containers share the host OS kernel, so they start in seconds, not minutes.
- **Reproducibility** — a `Dockerfile` is a recipe anyone can rebuild. New team member? `docker compose up` and they're running the full stack.

**Containers vs VMs:**

| | Container | VM |
|---|---|---|
| Boot time | Seconds | Minutes |
| Size | MBs | GBs |
| Isolation | Process-level | Full OS |
| Overhead | Minimal | Significant |

**When they're especially useful:**

- Running databases/services locally without installing them (e.g., `docker run postgres`)
- Ensuring your dev environment matches production
- Microservices — each service in its own container
- CI/CD pipelines — deterministic builds

The core workflow: you write a `Dockerfile` describing your environment, build it into an **image**, and run that image as a **container**. Docker Compose lets you define multi-container setups (app + database + cache) in a single YAML file.

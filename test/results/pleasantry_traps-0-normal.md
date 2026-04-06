A **container** is a lightweight, isolated environment that packages your application along with everything it needs to run — code, runtime, libraries, and system tools. Think of it as a self-contained box: whatever's inside works the same no matter where you open it.

## Why containers exist

Without containers, you hit the classic "works on my machine" problem. Your app depends on specific versions of Node, Python, system libraries, etc. A container bundles all of that so the app runs identically on your laptop, your colleague's laptop, and a production server.

## Containers vs. Virtual Machines

| | Container | VM |
|---|---|---|
| **Size** | Megabytes | Gigabytes |
| **Startup** | Seconds | Minutes |
| **Isolation** | Shares host OS kernel | Full separate OS |
| **Overhead** | Minimal | Significant |

Containers are much lighter because they share the host's OS kernel rather than running an entire guest operating system.

## When you'd want them

- **Consistent environments** — no more "but it works on my machine"
- **Easy setup** — new team members run `docker compose up` instead of following a 30-step install guide
- **Microservices** — run your database, API, and frontend each in their own container
- **CI/CD** — tests run in the same environment as production
- **Isolation** — one app's dependencies can't break another's

## Key concepts

- **Image** — a read-only template (like a blueprint). You build it once from a `Dockerfile`.
- **Container** — a running instance of an image. You can start, stop, and delete them freely.
- **Dockerfile** — a script that defines how to build an image (base OS, install dependencies, copy code, set startup command).
- **Docker Compose** — a tool for defining multi-container setups in a single `docker-compose.yml` file.

## Minimal example

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]
```

This builds an image that has Node 20, your dependencies, and your code — ready to run anywhere Docker is installed.

Happy to go deeper on any of these areas if you'd like.

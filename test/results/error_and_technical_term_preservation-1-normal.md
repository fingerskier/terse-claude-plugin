

`ECONNREFUSED 127.0.0.1:5432` means your app tried to connect to PostgreSQL on localhost port 5432, but nothing is listening there.

**Common causes & fixes:**

1. **PostgreSQL isn't running** — Start it:
   - macOS (Homebrew): `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`
   - Docker: `docker start <postgres-container>`

2. **Wrong port** — Check what port Postgres is actually on: `pg_lstat` or look in `postgresql.conf` for `port =`.

3. **Postgres is listening on a different address** — Check `listen_addresses` in `postgresql.conf`. It may be bound to a Unix socket only, not TCP. Set `listen_addresses = 'localhost'` and restart.

4. **Docker networking** — If your app is in Docker but Postgres is on the host, `127.0.0.1` inside the container doesn't reach the host. Use `host.docker.internal` instead (Docker Desktop) or `--network host`.

5. **Firewall** — Something is blocking the port. Check `sudo lsof -i :5432` to see if anything is listening.

**Quick diagnostic:**

```bash
# Is Postgres running and listening?
pg_isready -h 127.0.0.1 -p 5432
```

If that returns "accepting connections," the issue is in your app's connection config. If it returns "no response," Postgres isn't running or isn't on that host/port.

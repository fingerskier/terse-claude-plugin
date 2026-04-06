

`ECONNREFUSED 127.0.0.1:5432` means your app is trying to connect to a PostgreSQL database on localhost port 5432, but nothing is listening there.

**Common causes & fixes:**

1. **PostgreSQL isn't running** — Start it:
   - macOS (Homebrew): `brew services start postgresql`
   - Linux: `sudo systemctl start postgresql`
   - Docker: `docker start <container>` or `docker compose up -d`

2. **Wrong port** — Postgres may be on a non-default port. Check with:
   - `pg_lsclusters` (Linux) or check `postgresql.conf` for the `port` setting

3. **Docker networking** — If your app runs on the host but Postgres is in Docker (or vice versa), `127.0.0.1` won't resolve correctly. Use the container name as hostname in Docker Compose, or map the port with `-p 5432:5432`.

4. **Postgres is listening on a Unix socket only** — Check `postgresql.conf` for `listen_addresses` and ensure it includes `localhost` or `*`.

**Quick diagnostic:**

```bash
# Check if anything is listening on 5432
lsof -i :5432
# or
netstat -an | grep 5432
```

If nothing shows up, Postgres isn't running or isn't bound to that port.

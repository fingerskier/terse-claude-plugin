PostgreSQL not running or not listening on port 5432.

**Causes & fixes:**

1. **DB not running** — `brew services start postgresql` (macOS) or `sudo systemctl start postgresql` (Linux)
2. **Wrong port** — check `postgresql.conf` for `port =`, match in connection string
3. **Docker** — container not started or port not mapped. `docker ps` to check, `docker start <container>`
4. **Listen address** — `postgresql.conf` has `listen_addresses = 'localhost'` (not commented out)
5. **pg_hba.conf** — missing `host all all 127.0.0.1/32 md5` line

Quick diag: `pg_isready -h 127.0.0.1 -p 5432`. Shows if PG accepts connections.

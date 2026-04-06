

`ECONNREFUSED 127.0.0.1:5432` — nothing listening on localhost port 5432 (default PostgreSQL).

**Causes, most→least common:**
1. PostgreSQL not running
2. Running but on different port/socket
3. `pg_hba.conf` rejecting connection (rare for this error)

**Fixes:**

```bash
# Check if running
pg_isready            # or: brew services list | grep postgres

# Start it
brew services start postgresql    # macOS
sudo systemctl start postgresql   # Linux

# Verify port
grep port /opt/homebrew/var/postgresql@*/postgresql.conf  # macOS
```

If using Docker: container might not be up or port not mapped — `docker ps | grep postgres`.

If app config: confirm `host`, `port`, `user`, `password` match running instance.

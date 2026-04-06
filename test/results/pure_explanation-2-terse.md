

**CAP Theorem**: distributed system can guarantee only 2 of 3:

- **C**onsistency — every read gets latest write
- **A**vailability — every request gets response
- **P**artition tolerance — system works despite network splits

Partition tolerance non-negotiable in distributed systems, so real choice is **CP vs AP** during partitions.

## DB Mapping

| DB | CAP profile | Why |
|---|---|---|
| **PostgreSQL** | CA (single-node) / CP (replicated) | Strong consistency, single-leader. Partition = primary stays consistent, replicas may be unavailable |
| **MongoDB** | CP | Replica set w/ single primary. During partition, minority side loses writes. Consistency over availability |
| **Cassandra** | AP | Masterless, tunable consistency. Defaults to availability — accepts writes on any node, reconciles later via timestamps |

## Choosing

- Need ACID transactions, strong consistency → **PostgreSQL**. Tradeoff: vertical scaling limits, failover has downtime window
- Need flexible schema + consistency + horizontal reads → **MongoDB**. Tradeoff: writes bottleneck at primary
- Need high write throughput, multi-DC, always-on → **Cassandra**. Tradeoff: eventual consistency, no joins, data modeling around queries

## Nuance

CAP is partition-time behavior. Day-to-day (no partitions), all three provide all three. Real decision factors: data model, query patterns, ops complexity, consistency needs *during failures*.

Cassandra's tunable consistency (`QUORUM` reads/writes) can approximate CP per-query. MongoDB's `readPreference: secondary` can approximate AP. Lines blur in practice.

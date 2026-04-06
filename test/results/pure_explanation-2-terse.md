

**CAP Theorem**: distributed system can guarantee only 2 of 3:

- **C**onsistency — every read gets latest write
- **A**vailability — every request gets response
- **P**artition tolerance — system works despite network splits

Partition tolerance non-optional in distributed systems, so real choice is **CP vs AP** during partitions.

## Database mapping

| DB | Model | CAP trade-off | When partition hits |
|---|---|---|---|
| **PostgreSQL** | Single-node default | CA (no partitions) | N/A — not distributed by default. With Citus/patroni: CP |
| **MongoDB** | Replica sets | CP | Elects new primary, brief unavailability. Reads from secondaries possible but stale |
| **Cassandra** | Masterless ring | AP (tunable) | All nodes accept writes. Consistency tunable per query via `QUORUM`/`ALL`/`ONE` |

## Decision guide

**PostgreSQL** — Strong consistency, ACID, complex queries. Not inherently distributed. Pick when: relational model fits, single-region, transactions matter.

**MongoDB** — Document model, CP by default. Pick when: flexible schema, moderate scale, consistency > availability during failures.

**Cassandra** — AP default, linear write scale, multi-DC native. Pick when: massive write throughput, global distribution, eventual consistency acceptable.

## Key nuance

CAP is about behavior *during partitions*. Normal operation: all three achievable. Real-world choice is more about latency/consistency spectrum (see PACELC theorem — adds Else Latency/Consistency trade-off for non-partition state).

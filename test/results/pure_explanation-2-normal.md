## CAP Theorem

The CAP theorem (Brewer's theorem) states that a distributed data store can only guarantee **two of three** properties simultaneously:

| Property | Meaning |
|---|---|
| **Consistency** | Every read receives the most recent write (all nodes see the same data at the same time) |
| **Availability** | Every request receives a response (no timeouts, even if stale) |
| **Partition Tolerance** | The system continues operating despite network splits between nodes |

Since network partitions are unavoidable in distributed systems, the real choice is **CP vs AP** — what do you sacrifice when a partition occurs?

---

### How the three databases map

**PostgreSQL — CP (single-node) / CA (in practice)**
- Single-leader architecture: strong consistency by default (ACID transactions)
- During a network partition in a replicated setup, it favors consistency — replicas may become unavailable rather than serve stale data
- Best when: correctness matters most (financial systems, inventory, user accounts)

**MongoDB — CP (default) / tunable**
- Replica sets with a single primary: writes go to one node, reads are consistent by default
- During a partition, if the primary is isolated, the cluster elects a new one — the old primary becomes unavailable (CP behavior)
- Can be tuned toward AP by allowing reads from secondaries (`readPreference: secondary`), trading consistency for availability
- Best when: you want flexible schemas with strong-enough consistency (content platforms, catalogs)

**Cassandra — AP**
- Masterless ring architecture: any node can accept reads and writes
- During a partition, all nodes remain available and accept writes — conflicts are resolved later via last-write-wins or custom resolution
- Tunable consistency (`QUORUM`, `ALL`) can push it toward CP at the cost of availability
- Best when: availability and write throughput matter most (IoT telemetry, time-series, activity feeds)

---

### Decision shortcut

| Priority | Pick |
|---|---|
| Correctness / ACID transactions | PostgreSQL |
| Flexible schema + good-enough consistency | MongoDB |
| Always-on writes at massive scale | Cassandra |

The theorem doesn't say you *permanently lose* one property — it says during a partition, you must choose which one degrades. All three databases let you tune the tradeoff; they just start from different defaults.

# CAP Theorem

The CAP theorem states that a distributed data store can guarantee at most **two of three** properties simultaneously:

- **Consistency (C):** Every read returns the most recent write. All nodes see the same data at the same time.
- **Availability (A):** Every request receives a response (success or failure), even if some nodes are down.
- **Partition Tolerance (P):** The system continues operating despite network partitions (messages lost or delayed between nodes).

Since network partitions are unavoidable in distributed systems, the real choice is **CP vs AP** when a partition occurs.

## How It Maps to Databases

| Database | CAP Trade-off | What This Means |
|---|---|---|
| **PostgreSQL** | CP (single-node: CA) | Single-node Postgres sidesteps partitions entirely — you get strong consistency and availability. Once you replicate (streaming replication, Citus, etc.), you're choosing CP: synchronous replicas block writes during partitions to preserve consistency. |
| **MongoDB** | CP | Uses a primary node for writes with replica sets. During a partition, if the primary is unreachable, the cluster elects a new one — writes are unavailable briefly to maintain consistency. |
| **Cassandra** | AP | Peer-to-peer, no single primary. Writes succeed even during partitions (to whichever nodes are reachable). Consistency is tunable per-query (`ONE`, `QUORUM`, `ALL`), but the default design favors availability. Uses eventual consistency and conflict resolution (last-write-wins). |

## Practical Decision Guide

**Choose PostgreSQL** when you need strong ACID transactions, relational integrity, and your data fits on one node or a small cluster. Most applications start here.

**Choose MongoDB** when you need flexible schemas and horizontal reads, but still want a consistent view of data. Good for document-oriented workloads where you'd rather reject a write than serve stale data.

**Choose Cassandra** when you need high write throughput across regions and can tolerate eventual consistency — time-series data, IoT, activity logs, messaging. Downtime is more costly than a brief stale read.

## The Nuance

CAP is a simplification. In practice:

- **Partitions are rare** in well-managed infrastructure, so most of the time you get all three.
- **Consistency is a spectrum** — linearizable, sequential, causal, eventual — not binary.
- The **PACELC extension** is more useful: during a **P**artition choose **A** or **C**; **E**lse (normal operation) choose **L**atency or **C**onsistency. Cassandra is PA/EL. Postgres is PC/EC. MongoDB is PC/EC.

The right choice depends on your failure mode preference: would you rather show stale data or show an error?

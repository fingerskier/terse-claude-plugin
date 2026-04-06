

```
refactor(user-service): replace direct database imports with dependency injection

Decouple UserService from concrete database modules by accepting
repository interfaces via constructor injection. Improves testability
and enables swapping storage backends without modifying service logic.
```

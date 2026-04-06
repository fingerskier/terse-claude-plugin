```python
import csv
from typing import Any, Callable

Schema = dict[str, Callable[[Any], Any]]

def validate_csv(
    filepath: str,
    schema: Schema,
    delimiter: str = ",",
) -> tuple[list[dict], list[dict]]:
    """Read CSV, validate rows against schema, return (valid_rows, errors)."""
    valid_rows = []
    errors = []

    with open(filepath, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter=delimiter)

        for row_num, row in enumerate(reader, start=2):  # row 1 = header
            row_errors = []

            for field, validator in schema.items():
                value = row.get(field)
                try:
                    row[field] = validator(value)
                except (ValueError, TypeError, KeyError) as e:
                    row_errors.append({"field": field, "value": value, "error": str(e)})

            if row_errors:
                errors.append({"row": row_num, "data": dict(row), "errors": row_errors})
            else:
                valid_rows.append(dict(row))

    return valid_rows, errors
```

Usage:

```python
schema = {
    "name":  lambda v: v if v and v.strip() else (_ for _ in ()).throw(ValueError("empty name")),
    "age":   lambda v: int(v),
    "email": lambda v: v if "@" in (v or "") else (_ for _ in ()).throw(ValueError("invalid email")),
}

valid, errs = validate_csv("data.csv", schema)
```

Schema = dict mapping column name → validator fn. Validator returns coerced value on success, raises on failure. Errors capture row number, raw data, and per-field details.

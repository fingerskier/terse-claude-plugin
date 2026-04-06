```python
import csv
from dataclasses import dataclass, field
from typing import Any, Callable

FieldValidator = Callable[[str, Any], str | None]  # (field_name, value) -> error_msg or None


@dataclass
class Schema:
    fields: dict[str, list[FieldValidator]]  # field_name -> validators
    required: set[str] = field(default_factory=set)


@dataclass
class ValidationResult:
    valid_rows: list[dict[str, str]]
    errors: list[dict[str, Any]]  # [{row, field, message}]


def required(field_name: str, value: Any) -> str | None:
    if value is None or str(value).strip() == "":
        return f"{field_name} is required"
    return None


def max_length(n: int) -> FieldValidator:
    def check(field_name: str, value: Any) -> str | None:
        if value and len(str(value)) > n:
            return f"{field_name} exceeds max length {n}"
        return None
    return check


def is_type(typ: type) -> FieldValidator:
    def check(field_name: str, value: Any) -> str | None:
        try:
            typ(value)
            return None
        except (ValueError, TypeError):
            return f"{field_name} must be {typ.__name__}"
    return check


def read_and_validate_csv(filepath: str, schema: Schema) -> ValidationResult:
    valid_rows = []
    errors = []

    with open(filepath, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)

        for row_num, row in enumerate(reader, start=2):  # row 1 = header
            row_errors = []

            # Check for missing required fields
            for req in schema.required:
                if req not in row or not row[req].strip():
                    row_errors.append({
                        "row": row_num,
                        "field": req,
                        "message": f"{req} is required",
                    })

            # Run field validators
            for field_name, validators in schema.fields.items():
                value = row.get(field_name)
                for validator in validators:
                    error_msg = validator(field_name, value)
                    if error_msg:
                        row_errors.append({
                            "row": row_num,
                            "field": field_name,
                            "message": error_msg,
                        })

            if row_errors:
                errors.extend(row_errors)
            else:
                valid_rows.append(row)

    return ValidationResult(valid_rows=valid_rows, errors=errors)
```

Usage:

```python
schema = Schema(
    fields={
        "name": [max_length(100)],
        "age": [is_type(int)],
        "email": [max_length(255)],
    },
    required={"name", "email"},
)

result = read_and_validate_csv("data.csv", schema)
print(f"{len(result.valid_rows)} valid, {len(result.errors)} errors")
for e in result.errors:
    print(f"  Row {e['row']}: {e['field']} — {e['message']}")
```

Validators composable — add custom ones matching `(field_name, value) -> str | None` signature. `Schema.required` handles presence checks; `Schema.fields` dict maps columns to validator lists run in order.

---
'@leafygreen-ui/combobox': patch
---

- Updates focus behavior, allowing users to re-open the menu with the mouse after making a selection
- Adds a warning if `multiselect` and `value` props don't align
- Fixes a bug where long display names would get truncated early
- Fixes a bug where the space bar wouldn't type a space character
- Fixes a bug where some characters could not be typed when a `value` prop was passed in
- Updates hooks dependency to `^7.2.0`

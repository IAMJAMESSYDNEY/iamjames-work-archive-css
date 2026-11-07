# IAMJAMES Work archive CSS case study

A small browser demo adapted from the production IAMJAMES Work archive.
It uses fictional projects and three files of plain HTML, CSS and JavaScript.

## Run the demo

Download the files together and open `index.html` in a browser. The demo
runs locally without WordPress, a build step or a server.

## Why a filtered row stays hidden on mobile

The desktop row uses flex. At 767px and below, the same row uses grid.
The search script toggles a class on the row. The stylesheet owns the
resulting visibility.

| Rule | Specificity | Display |
| --- | --- | --- |
| `#work-archive .archive__row` | `(1, 1, 0)` | Flex by default, grid on mobile |
| `#work-archive .archive__row.is-search-hidden` | `(1, 2, 0)` | None at either width |

Both are ordinary declarations in the same cascade context. The extra
state class wins even though the mobile layout rule comes later.
Read [archive.css](archive.css) for the cascade and
[archive.js](archive.js) for the filter and date sort.

## Try it in DevTools

1. Search for **wayfinding**. Only Harbour Atlas should remain.
2. Set the responsive viewport to 768px, then to 767px without clearing
   the search. Inspect **Computed → display**. Harbour Atlas changes from
   flex to grid and the two unmatched rows stay at `display: none`.
3. With the viewport still at 767px, temporarily disable the hidden-state
   declaration in DevTools. Watch the grid rule take over on unmatched rows.
   Re-enable it to restore filtering.
4. Search for **no match** and confirm the status message. Clear the search,
   then use the date-order button twice. The rows should reverse and return
   to their original order. Use Tab to check the search and sort focus rings.

The production archive also handles WordPress data, category views,
additional sort columns and motion. This demo isolates the responsive
visibility rule so readers can trace it from input to computed style.

## Verification

The local demo passed checks in Chrome and Playwright WebKit in both
colour schemes. Checks covered filtering across 768px and 767px, the
empty state, keyboard sorting, focus, 320px layout and the static list
with JavaScript disabled. Depending on Safari's keyboard settings,
use Option–Tab to focus buttons.

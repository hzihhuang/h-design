---
title: useLocalStorageState
group:
  title: state
  order: 1
order: 3
---

# useLocalStorageKeys

A hook to manage multiple localStorage keys as state

`useLocalStorageKeys` accepts an array of localStorage keys and returns an object containing the current values for those keys along with a `dispatch(key, value)` function to update individual keys.

It supports synchronization across multiple browser tabs and within the same tab to keep state consistent.

## Example

<code src="./demo" description="Demo showing synchronization of multiple localStorage keys across tabs and components">Demo</code>

## Parameters

| Parameter | Description                          | Type       | Required |
| --------- | ------------------------------------ | ---------- | -------- |
| keys      | Array of localStorage keys to manage | `string[]` | Yes      |

## Returns

| Return   | Description                             | Type                                           |
| -------- | --------------------------------------- | ---------------------------------------------- |
| state    | Object with current values for the keys | `{ [key: string]: string \| null }`            |
| dispatch | Function to update a key's value        | `(key: string, value: string \| null) => void` |

- Each key in `state` holds the corresponding localStorage value or `null` if not set
- Calling `dispatch` updates the localStorage key; passing `null` removes it

## Features

- Initializes state from localStorage for specified keys
- Updates localStorage and broadcasts changes when `dispatch` is called
- Listens for browser `storage` events to sync across tabs
- Uses BroadcastChannel API for syncing within the same tab

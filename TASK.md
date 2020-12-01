# Models
```ts
type Currency = {
    name: string,
    code: 'XXX' | string,
    course: number
}
```
# Task
1. There must be a **console** command that will change value of some currency
2. There must be an **ability to search** by currency name.
3. There must be a **JWT auth**.
4. You must use **MongoDB**

# Api Spec
## GET api/currencies
1. Must return all currencies
2. Must be able to accept query, specifying **limit** and **page**
3. Must have **limit 5 by default**

## GET api/currencies/:id
1. Must return the whole info about the currency.

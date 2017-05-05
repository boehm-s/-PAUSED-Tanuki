# Users

## User model :

### Table / Model name : 'users'

```
{
  id: Number, // Primary key
  firstname: String,
  lastname: String,
  email: String,
  birthdate: Date, //  (UNIX timestamp) = int,
  password: String,
  role: Number (references role PK)
}
```

### Methods on model 'users'

 * getAll()
 * getBy(obj)
 * updateBy(obj)
 * create
 * deleteBy(obj)

All the methods that have 'By' suffix can perform bulk operations. If you want the operation to be performed on an only entry, just pass the `id` as parameter of the function (`id`s are unique).

### Table / Model name : 'roles'
```
{
  id: Number, // Primary key
  role: String, // role title
  description: String, // description of the role
}
```

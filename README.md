# screentask-gonzalez
Cor libraries:
vue-test-utils
pouchDB

## Install dependencies
```
npm install
```

### Run project in local
```
npm run serve
```

### Execute tests
```
npm run test:unit
```

### Testing the app
Initially, the pouchDB will be populated with the initializeData method when it sees that there are zero documents in the 'mydb' collection.

4 Values can only have 4 items in the array, 12 principles can only have 12 items in the array.

You can update each values and principles via the textboxes, it will call the updateFn on blur.

You can delete individual items in the array via the "x" button beside each item.

You can clear the db via the clear button above.

You can add up to 4 values and 12 principles only. Once you hit the maximum number, the add textboxes should be hidden.

You can also repopulate the db via the populate button beside the clear button. This is only allowed if you have 0 documents in the db.

### Unit Testing Notes
You can change return values of the methods in the component to see how the tests checks and validates it.
example:
In the 'addFn' method, you can change the success return of the db.post call to "return false", this means the add function to the db failed as you can see in the catch section of the promise.

Another way to check is to change the return of the getAll method as it returns total number of items in the values and principles array which is fetched from pouchDB

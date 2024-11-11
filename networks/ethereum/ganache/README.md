1. use ganache js to run a ethereum node locally
```
npx ganache \
  --account="0x0000000000000000000000000000000000000000000000000000000000000001,1000000000000000000" \
  --account="0x0000000000000000000000000000000000000000000000000000000000000002,1000000000000000000"
```
2. run test：
```
npx jest --preset ts-jest ganache/__tests__/send.test.ts
```
# modern-aws-tools

modern aws tools

### S3

- s3Upload

```ts
import { s3Upload } from 'modern-aws-tools';

s3Upload({
  credential: {
    accessKeyId: 'xxx',
    secretAccessKey: 'xxx',
    expiration: '',
    sessionToken: ''
  },
  region: 'xxx',
  bucket: 'xxx',
  host: 'xxx',
  prefix: 'xxx',
  file: new File(['xxx'], 'xxx'),
  key: 'xxx'
})
```

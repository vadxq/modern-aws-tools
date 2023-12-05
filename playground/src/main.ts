import { s3Upload } from '../../';

const div = document.createElement('div');
div.innerHTML = 'click';
div.onclick = () => {
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
  });
};

document.body.appendChild(div);

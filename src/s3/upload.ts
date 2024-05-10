import { utoa } from '../shared/base64';
import getDate from '../shared/getDate';
import getExactDate from '../shared/getExactDate';
import sign from '../shared/sign';
import { UUID } from '../shared/uuid';
import { S3UploadOptions } from '../types';

/**
 * 上传单个文件到s3
 * @param req S3UploadOptions
 * @returns
 */
export const s3Upload = async (req: S3UploadOptions) => {
  try {
    return new Promise((resolve, reject) => {
      // 生成一个随机文件名
      const finalKey = `${
        req.prefix ? req.prefix + '/' : ''
      }${UUID().toString()}.${new Date().getTime()}.${
        req.key.split('.')[
          req.key.split('.').length > 1 ? req.key.split('.').length - 1 : 0
        ]
      }`;

      // 获取密钥
      const form = s3_upload_form(req, req.finalKey || finalKey);

      // 新建一个formdata 对象
      const data = new FormData();

      // 为formdata 对象赋值
      data.append('acl', form['acl']);
      data.append('key', form['key']);
      data.append('Content-Type', req.file.type);
      data.append('policy', form['policy']);
      data.append('success_action_status', form['success_action_status']);
      data.append('x-amz-algorithm', form['x-amz-algorithm']);
      data.append('x-amz-credential', form['x-amz-credential']);
      data.append('x-amz-date', form['x-amz-date']);
      data.append('x-amz-signature', form['x-amz-signature']);
      data.append('x-amz-meta-tag', form['x-amz-meta-tag']);
      data.append('x-amz-meta-uuid', form['x-amz-meta-uuid']);
      data.append(
        'x-amz-server-side-encryption',
        form['x-amz-server-side-encryption']
      );
      data.append('x-amz-security-token', form['x-amz-security-token']);
      data.append('file', req.file);
      fetch(form.action, {
        body: data,
        method: 'POST'
      })
        .then((e) => {
          console.log(e);
          resolve({
            msg: e,
            host: req.host,
            key: req.finalKey || finalKey
          });
        })
        .catch((err) => reject(err));
    });
  } catch (error) {
    console.log(error);
  }
};

// 上传时需要用的密钥
const s3_upload_form = (req: S3UploadOptions, finalKey: string) => {
  // post form
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form: any = {
    acl: 'public-read',
    success_action_status: '201',
    'x-amz-algorithm': 'AWS4-HMAC-SHA256',
    'x-amz-credential':
      req.credential.accessKeyId +
      '/' +
      getDate() +
      '/' +
      req.region +
      '/s3/aws4_request',
    'x-amz-date': getDate() + 'T000000Z',
    'x-amz-meta-tag': '',
    'x-amz-meta-uuid': 14365123651274,
    'x-amz-server-side-encryption': 'AES256',
    'x-amz-security-token': req.credential.sessionToken
  };

  // post 策略
  // 参考 https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-HTTPPOSTConstructPolicy.html
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const policy: any = {
    conditions: [
      { bucket: req.bucket },
      { acl: 'public-read' },
      ['content-length-range', 32, 5368709120],
      { success_action_status: form['success_action_status'] },
      { 'x-amz-algorithm': form['x-amz-algorithm'] },
      { 'x-amz-credential': form['x-amz-credential'] },
      { 'x-amz-date': form['x-amz-date'] },
      { 'x-amz-meta-uuid': '14365123651274' },
      { 'x-amz-server-side-encryption': 'AES256' },
      {
        'x-amz-security-token': form['x-amz-security-token']
      },
      ['starts-with', '$Content-Type', ''],
      ['starts-with', '$x-amz-meta-tag', ''],
      ['starts-with', '$key', `${req.prefix ? req.prefix + '/' : ''}`]
    ],
    expiration: req.credential.expiration
      ? req.credential.expiration
      : getExactDate()
  };

  form['action'] = 'https://' + req.bucket + '.s3' + req.region + '.amazonaws.com/';

  form['key'] = finalKey;

  policy['conditions'].push({ key: finalKey });

  // policy 要base64编码
  form['policy'] = utoa(JSON.stringify(policy));

  console.log(form['policy']);

  // x-amz-signature 最重要的签名值
  form['x-amz-signature'] = sign(
    req.credential.secretAccessKey,
    req.region,
    's3',
    form['policy']
  );
  return form;
};

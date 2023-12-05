export interface S3UploadOptions {
  credential: {
    accessKeyId: string;
    expiration: string;
    secretAccessKey: string;
    sessionToken: string;
  };
  region: string; // region 区域
  bucket: string; // bucket name
  host: string; // host
  prefix?: string; // 前缀
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any; // 文件
  key: string; // 文件名
  finalKey?: string; // 最终文件名
}

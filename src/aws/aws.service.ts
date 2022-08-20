import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AwsService {
  async upload(file) {
    const { originalname } = file;
    const bucketS3 = process.env.BUCKET_NAME_AWS;
    try {
      const data = await (<any>(
        this.uploadS3(file.buffer, bucketS3, originalname)
      ));
      return data.Location;
    } catch (err) {
      throw Error(err.message);
    }
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.ACCESS_KEY_ID_AWS,
      secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
    });
  }
}

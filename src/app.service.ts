import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!ewdwe';
  }
  async sendMail(from:string, to:string, subject:string, text:string){
    const nodemailer = require('nodemailer')
    const transpoter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
          user: 'smirn077@mail.ru',
          pass: '42XZLRropTVS9mjD8laj',
      },
    })
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: `
      <div>
        <h1>Перчини Тест</h1>
        <p>Менеджер добавил Вас в систему. Вам был автоматически сгенерирован пароль<p>
        <div>
          <p>Ваш пароль: ${text}
        </div>
      </div>`
  };
  
  transpoter.sendMail(mailOptions);
}

async sendMailsNewTest(from:string, to:string, subject:string, text:string){
  const nodemailer = require('nodemailer')
    const transpoter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'smirn077@mail.ru',
        pass: '42XZLRropTVS9mjD8laj',
      },
    })
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: `
      <div>
        <h1>Перчини Тест</h1>
        <p>Менеджер добавил новый тест в систему ${text}<p>
        <div>
          <p>Скорее начните прохождение нового теста</p>
        </div>
      </div>`
  };
  await transpoter.sendMail(mailOptions)

}
}

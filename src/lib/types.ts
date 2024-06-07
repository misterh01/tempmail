export interface IEmail {
  id: number
  from: string
  subject: string
  date: string
}

export interface IEmailDetail extends IEmail {
  body: string
  attachments: IEmailAttachment[]
}

interface IEmailAttachment {
  filename: string
  contentType: string
  size: number
}

// export { IEmail, IEmailDetail, IEmailAttachment }
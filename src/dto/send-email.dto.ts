import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({ type: [String], description: 'Lista de emails de destino' })
  emails: string[];

  @ApiProperty({ description: 'Assunto do email' })
  subject: string;

  @ApiProperty({ description: 'Corpo / mensagem do email' })
  message: string;
}

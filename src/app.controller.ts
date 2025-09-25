import { Body, Controller, Get, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendEmailDto } from './dto/send-email.dto';

@ApiTags('email')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService
  ) {}

  @Post('send-email')
  @ApiOperation({ summary: 'Dispara automação de envio de e-mails via n8n' })
  @ApiBody({ type: SendEmailDto })
  @ApiResponse({ status: 200, description: 'Resposta de sucesso' })
  @ApiResponse({ status: 500, description: 'Erro interno' })
  async triggerEmailAutomation(@Body() payload: SendEmailDto) {
    try {
      // URL do webhook no n8n
      const n8nWebhookUrl = 'https://pedrodamascenoof.app.n8n.cloud/webhook-test/email-auto-seller-booster';

      // Faz a requisição para o n8n
      const response = await this.httpService.post(n8nWebhookUrl, payload).toPromise();

      return {
        success: true,
        n8nResponse: response?.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

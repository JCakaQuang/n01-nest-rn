import { All, Controller, Req, Res, HttpStatus } from '@nestjs/common';
import express from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Controller()
export class GatewayController {
    constructor(private readonly httpService: HttpService) {}

    @All('*')
    async forwardRequest(@Req() req: express.Request, @Res() res: express.Response) {
        const recipientServiceUrl = this.getRecipientServiceUrl(req.originalUrl);

        if (!recipientServiceUrl) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'API route not found' });
        }

        const { method, body, headers } = req;
        // Lọc các header không cần thiết để tránh lỗi
        const headersToForward = { ...headers };
        delete headersToForward['host'];
        delete headersToForward['connection'];
        delete headersToForward['content-length']; // Sẽ được tính lại bởi axios
        headersToForward['content-type'] = req.headers['content-type'] || 'application/json';

        try {
            const response = await firstValueFrom(
                this.httpService.request({
                    method: method as any,
                    url: `${recipientServiceUrl}${req.originalUrl}`,
                    data: body,
                    headers: headersToForward,
                })
            );
            return res.status(response.status).json(response.data);
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                return res.status(axiosError.response.status).json(axiosError.response.data);
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An internal error occurred' });
        }
    }

    private getRecipientServiceUrl(url: string): string | null {
        // Định tuyến dựa trên tiền tố của URL
        if (url.startsWith('/api/v1/users') || url.startsWith('/api/v1/auth')) {
            return process.env.USER_SERVICE_URL ?? null; // e.g., http://user-service:8080
        }
        if (url.startsWith('/api/v1/order') || url.startsWith('/api/v1/payment') || url.startsWith('/api/v1/oder-detail')) {
            return process.env.ORDER_SERVICE_URL ?? null; // e.g., http://order-payment-service:8081
        }
        if (url.startsWith('/api/v1/foods') || url.startsWith('/api/v1/foodtype')) {
            return process.env.FOOD_SERVICE_URL ?? null; // e.g., http://food-service:8082
        }
        return null;
    }
}

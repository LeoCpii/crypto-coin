import { Request, Response, NextFunction } from 'express';

class HealthController {
    public async discovery(req: Request, res: Response, next: NextFunction): Promise<Response> {
        return res.json({ message: 'The application is healthy' });
    }
}

export default new HealthController();
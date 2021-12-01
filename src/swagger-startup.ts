import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from "@nestjs/swagger";

export const SwaggerStartup = app => {
    const customOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'Task System API Docs',
    };

    const config = new DocumentBuilder()
        .setTitle('Task System')
        .setDescription('Task System API description')
        .setVersion('1.0')
        .addTag('tasks')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, customOptions);
}


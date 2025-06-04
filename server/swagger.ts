import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Globalia API',
      version: '1.0.0',
      description: 'A comprehensive API for tracking countries and places you have visited around the world',
      contact: {
        name: 'Globalia Support',
        email: 'support@Globalia.com'
      }
    },
    servers: [
      {
        url: '/api',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique user identifier'
            },
            username: {
              type: 'string',
              description: 'User email address'
            },
            fullName: {
              type: 'string',
              description: 'User full name'
            },
            homeCountryCode: {
              type: 'string',
              description: 'ISO 2-letter code of user home country',
              nullable: true
            },
            homeCountryName: {
              type: 'string',
              description: 'Name of user home country',
              nullable: true
            },
            shareId: {
              type: 'string',
              description: 'Unique identifier for sharing travel maps',
              nullable: true
            }
          }
        },
        Visit: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique visit identifier'
            },
            userId: {
              type: 'integer',
              description: 'ID of the user who made this visit'
            },
            countryCode: {
              type: 'string',
              description: 'ISO 2-letter country code'
            },
            countryName: {
              type: 'string',
              description: 'Full country name'
            },
            state: {
              type: 'string',
              description: 'State or province visited',
              nullable: true
            },
            city: {
              type: 'string',
              description: 'City visited',
              nullable: true
            },
            visitDate: {
              type: 'string',
              format: 'date',
              description: 'Date of visit (YYYY-MM format)',
              nullable: true
            },
            notes: {
              type: 'string',
              description: 'Personal notes about the visit',
              nullable: true
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'User email address'
            },
            password: {
              type: 'string',
              description: 'User password'
            }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['username', 'password', 'fullName'],
          properties: {
            username: {
              type: 'string',
              description: 'User email address'
            },
            password: {
              type: 'string',
              description: 'User password'
            },
            fullName: {
              type: 'string',
              description: 'User full name'
            },
            homeCountryCode: {
              type: 'string',
              description: 'ISO 2-letter code of user home country',
              nullable: true
            },
            homeCountryName: {
              type: 'string',
              description: 'Name of user home country',
              nullable: true
            }
          }
        },
        CreateVisitRequest: {
          type: 'object',
          required: ['countryCode', 'countryName'],
          properties: {
            countryCode: {
              type: 'string',
              description: 'ISO 2-letter country code'
            },
            countryName: {
              type: 'string',
              description: 'Full country name'
            },
            state: {
              type: 'string',
              description: 'State or province visited',
              nullable: true
            },
            city: {
              type: 'string',
              description: 'City visited',
              nullable: true
            },
            visitDate: {
              type: 'string',
              format: 'date',
              description: 'Date of visit (YYYY-MM format)',
              nullable: true
            },
            notes: {
              type: 'string',
              description: 'Personal notes about the visit',
              nullable: true
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      },
      securitySchemes: {
        sessionAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
          description: 'Session-based authentication using cookies'
        }
      }
    },
    security: [
      {
        sessionAuth: []
      }
    ]
  },
  apis: ['./server/routes.ts'], // Path to the API docs
};

const specs = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Globalia API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      showExtensions: true,
      showCommonExtensions: true
    }
  }));
}

export { specs };
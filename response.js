const responses = {
    UserResponse: {
      description: 'User response',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
          },
        },
      },
    },
  };
  
  module.exports = responses;
  
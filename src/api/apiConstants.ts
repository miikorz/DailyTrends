enum SERVER_STATUS {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
}

const SERVER_MESSAGES = {
  [SERVER_STATUS.INTERNAL_SERVER_ERROR]: 'Unexpected error occurred',
  [SERVER_STATUS.NOT_FOUND]: 'Feed not found',
  DELETED: 'Feed deleted successfully',
  [SERVER_STATUS.BAD_REQUEST]: 'Bad request',
};

enum SERVER_CODES {
  REQUEST_SUCCESSFUL = 200,
  DELETED_SUCCESSFULLY = 204,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
}

export { SERVER_STATUS, SERVER_MESSAGES, SERVER_CODES };

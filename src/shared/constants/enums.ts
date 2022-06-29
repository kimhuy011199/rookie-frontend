export enum KEY_CODE {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
}

export enum ERROR_CODE {
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  UNAUTHENTICATED = 401,
}

export enum COMMENT_TYPE {
  QUESTION = 1,
  COMMENT = 2,
  REPLY = 3,
}

export enum COMMENT_ACTIONS {
  EDIT = 1,
  DELETE = 2,
}

export enum NOTI_TYPE {
  ANSWER_QUESTION = 1,
  LIKE_ANSWER = 2,
}

export enum USER_ACTIONS {
  VIEW_PROFILE = 1,
  SETTINGS = 2,
  CHANGE_PASS = 3,
  LOG_OUT = 4,
}

export enum FILTER_TYPE {
  RESET_FILTER = 0,
  MOST_LIKES = 1,
  LOWEST_LIKES = 2,
  NEWEST_ANSWER = 3,
  OLDEST_ANSWER = 4,
}

export enum DIALOG_SIZE {
  SM = 0,
  MD = 1,
  LG = 2,
}

const IS_PROD       = false
const PORT          = 4000

export const SOCKET_ORIGIN = IS_PROD ? "" : `http://127.0.0.1:${PORT}`

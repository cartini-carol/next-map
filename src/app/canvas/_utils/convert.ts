/**
 * 파일 사이즈 전황 함수
 * @param bytes
 * @param decimals
 * @returns
 */
export const formatBytes = (bytes?: number, decimals = 0) => {
  if (bytes) {
    const k = 1024.0;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    /**
     * size = byte(1024)^n
     *  -> log(size) = n*log(byte)
     *  -> n = log(size) / log(byte)
     */
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const unit = k ** i;

    return `${parseFloat((bytes / unit).toFixed(dm))}${sizes[i]}`;
  }
  return undefined;
};
